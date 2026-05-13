import json, os, re, unicodedata, time
from collections import defaultdict, Counter
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

from nltk.corpus import cmudict

AUDIO_INDEX_PATH = 'audio-index.json'
WORDS_PATH = 'all-words.txt'
LEVEL_MAP_PATH = 'word-level-map.json'
AUDIO_DIR = 'audio'
OUT_PATH = 'PRONUNCIATION-AUDIT-GPT.md'

cmu = cmudict.dict()  # lowercase keys

# --- helpers ---
VOWELS = {
  'AA','AE','AH','AO','AW','AY','EH','ER','EY','IH','IY','OW','OY','UH','UW',
  'AX','AXR','IX','UX'
}
ARPABET_TO_IPA = {
  'AA':'ɑ', 'AE':'æ', 'AH':'ʌ', 'AO':'ɔ', 'AW':'aʊ', 'AY':'aɪ', 'EH':'ɛ',
  'ER':'ɝ', 'EY':'eɪ', 'IH':'ɪ', 'IY':'i', 'OW':'oʊ', 'OY':'ɔɪ', 'UH':'ʊ', 'UW':'u',
  'AX':'ə', 'AXR':'ɚ', 'IX':'ɨ', 'UX':'ʉ',

  'B':'b', 'CH':'tʃ', 'D':'d', 'DH':'ð', 'F':'f', 'G':'ɡ', 'HH':'h', 'JH':'dʒ',
  'K':'k', 'L':'l', 'M':'m', 'N':'n', 'NG':'ŋ', 'P':'p', 'R':'ɹ', 'S':'s', 'SH':'ʃ',
  'T':'t', 'TH':'θ', 'V':'v', 'W':'w', 'Y':'j', 'Z':'z', 'ZH':'ʒ',

  'DX':'ɾ', 'EL':'l̩', 'EM':'m̩', 'EN':'n̩', 'NX':'n', 'Q':'ʔ'
}

def strip_diacritics(s: str) -> str:
  return ''.join(c for c in unicodedata.normalize('NFKD', s) if not unicodedata.combining(c))

def normalize_for_cmu(token: str) -> str:
  t = strip_diacritics(token.lower()).replace('’', "'")
  t = re.sub(r"[^a-z0-9']+", '', t)
  return t

def tokenize_phrase(phrase: str):
  s = strip_diacritics(phrase.lower()).replace('’',"'")
  s = re.sub(r"[^a-z0-9'\- ]+", ' ', s)
  parts = re.split(r"[\s\-]+", s.strip())
  return [p for p in parts if p]

def arpabet_pron_to_ipa(phones):
  out = []
  pending_stress = ''
  for ph in phones:
    m = re.match(r"^([A-Z]+)([012])?$", ph)
    if not m:
      base, stress = ph, None
    else:
      base, stress = m.group(1), m.group(2)

    if stress == '1':
      pending_stress = 'ˈ'
    elif stress == '2':
      pending_stress = 'ˌ'

    ipa = ARPABET_TO_IPA.get(base)
    if ipa is None:
      ipa = base.lower()

    if base in VOWELS and pending_stress:
      out.append(pending_stress + ipa)
      pending_stress = ''
    else:
      out.append(ipa)
  return ''.join(out)

# --- fallbacks for missing tokens ---

def fetch_datamuse_arpabet(token: str):
  # Datamuse often returns ARPABET in tags: pron:...
  url = f"https://api.datamuse.com/words?sp={token}&md=r&max=1"
  req = Request(url, headers={'User-Agent':'word-street-pron-audit/1.0'})
  try:
    with urlopen(req, timeout=20) as resp:
      data = resp.read().decode('utf-8', errors='replace')
  except Exception:
    return None
  try:
    j = json.loads(data)
  except Exception:
    return None
  if not isinstance(j, list) or not j:
    return None
  tags = j[0].get('tags') or []
  for t in tags:
    if isinstance(t, str) and t.startswith('pron:'):
      pron = t[len('pron:'):].strip()
      if pron:
        # split into phones (keeps stress digits)
        phones = [p for p in pron.split() if p]
        # normalize like CMU (uppercase)
        return phones
  return None


def fetch_dictionaryapi_ipa(token: str):
  url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{token}"
  req = Request(url, headers={'User-Agent':'word-street-pron-audit/1.0'})
  try:
    with urlopen(req, timeout=20) as resp:
      data = resp.read().decode('utf-8', errors='replace')
  except HTTPError as e:
    if e.code in (404, 429):
      return None
    return None
  except URLError:
    return None

  try:
    j = json.loads(data)
  except Exception:
    return None

  texts = []
  for entry in j if isinstance(j, list) else []:
    for p in entry.get('phonetics', []) or []:
      t = p.get('text')
      if t and isinstance(t, str):
        texts.append(t)
  for t in texts:
    if '/' in t or 'ˈ' in t or 'ə' in t or 'ɪ' in t:
      return t.strip()
  if texts:
    return texts[0].strip()
  return None

# --- Risk heuristics ---
HETERONYMS = set([
  'read','lead','bow','tear','wind','close','live','record','minute','object','resume','bass','dove',
  'desert','number','row','sewer','sow','subject','invalid','produce','perfect','present','project','rebel',
  'refuse','use','house','excuse','abuse','advocate','animate','appropriate','articulate','associate','certificate',
  'degenerate','delegate','deliberate','desolate','duplicate','elaborate','estimate','graduate','intimate','legitimate',
  'moderate','predicate','separate','subordinate','syndicate','affect','attribute','conduct','conflict','console','content',
  'contest','contract','contrast','convert','convict','defect','digest','discount','escort','exploit','export','extract',
  'impact','implant','import','insert','insult','invite','permit','pervert','proceeds','progress','protest',
  'recall','recess','refund','reject','relapse','remake','repeat','research','segment','suspect','torment','transfer','transport',
  'update','upgrade','upset'
])
IRREGULAR = set([
  'colonel','choir','thorough','knight','psychology','pneumonia','subtle','receipt','debt','doubt','island','isle','aisle',
  'ballet','cafe','chaos','epitome','hyperbole','yacht','bourgeois','corps','gauge','indict','lieutenant','macabre','plaid',
  'queue','rendezvous','sword','tsunami','wednesday'
])

def assess_tts_risk(word: str, source: str, cmu_prons_count: int, used_fallback: bool, used_dictapi: bool):
  if source != 'macos-samantha':
    return '🟢 SAFE', None

  reasons = []
  toks = tokenize_phrase(word)
  lowtoks = [normalize_for_cmu(t) for t in toks]

  if any(t in HETERONYMS for t in lowtoks if t):
    reasons.append('异读词/词类转换可能导致TTS选错读音')

  if any(t in IRREGULAR for t in lowtoks if t):
    reasons.append('不规则拼写/静默字母，TTS易读错')

  if any(ord(c) > 127 for c in word):
    reasons.append('含变音符/外来语拼写，TTS可能不稳')

  if ' ' in word.strip() or '-' in word:
    reasons.append('短语/复合结构，TTS可能断句或重音异常')

  if cmu_prons_count >= 2:
    reasons.append('词典存在多读音，TTS可能选错')

  if used_dictapi:
    reasons.append('IPA来自在线词典（可能偏英式/标注风格不同），建议人工抽检')

  if used_fallback and not used_dictapi:
    # datamuse fallback is still dictionary-derived but less explicit about dialect
    reasons.append('IPA由在线ARPABET回退转换，建议人工抽检')

  if any('异读词' in r for r in reasons):
    return '🔴 DANGER', '；'.join(reasons)
  if cmu_prons_count >= 2 and (('短语' in '；'.join(reasons)) or ('不规则' in '；'.join(reasons))):
    return '🔴 DANGER', '；'.join(reasons)
  if reasons:
    return '🟡 WARN', '；'.join(reasons)
  return '🟢 SAFE', None

# --- filename mapping ---

def slugify_filename(word: str):
  s = strip_diacritics(word.lower()).replace('’',"'")
  s = s.strip()
  s = s.replace('&', ' and ')
  s = re.sub(r"[^a-z0-9]+", '_', s)
  s = re.sub(r"_+", '_', s).strip('_')
  return s + '.mp3'

# --- load data ---
words = [line.strip() for line in open(WORDS_PATH, 'r', encoding='utf-8') if line.strip()]
level_map = json.load(open(LEVEL_MAP_PATH, 'r', encoding='utf-8'))
idx = json.load(open(AUDIO_INDEX_PATH, 'r', encoding='utf-8'))
files_map = idx.get('files', {})
actual_audio = set([fn for fn in os.listdir(AUDIO_DIR) if fn.lower().endswith('.mp3')])

# --- precompute missing tokens and fetch fallbacks ---
missing_tokens = set()
for w in words:
  for t in tokenize_phrase(w):
    key = normalize_for_cmu(t)
    if not key:
      continue
    if key in cmu:
      continue
    if key.replace("'", '') in cmu:
      continue
    if key.endswith('s') and key[:-1] in cmu:
      continue
    missing_tokens.add(key)

# Fallback caches
fallback_arpabet = {}  # token -> list of phones (ARPABET)
dictapi_ipa = {}       # token -> IPA text
fallback_fail = {}     # token -> reason

for tok in sorted(missing_tokens):
  phones = fetch_datamuse_arpabet(tok)
  if phones:
    fallback_arpabet[tok] = phones
    time.sleep(0.05)
    continue

  ipa = fetch_dictionaryapi_ipa(tok)
  if ipa:
    dictapi_ipa[tok] = ipa
    time.sleep(0.10)
    continue

  fallback_fail[tok] = 'no_pronunciation_found'
  time.sleep(0.05)

# --- IPA generation ---

def token_ipa_from_fallback(tok: str):
  if tok in fallback_arpabet:
    return arpabet_pron_to_ipa(fallback_arpabet[tok]), True, False
  if tok in dictapi_ipa:
    t = dictapi_ipa[tok].strip()
    t = t.strip('/')
    return t, True, True
  # last resort (should be empty after fallbacks; keep non-empty IPA anyway)
  return tok, True, False


def word_ipa(word: str):
  # returns (ipa_string, cmu_prons_count, used_fallback_bool, used_dictapi_bool)
  toks = tokenize_phrase(word)

  if len(toks) == 1:
    key = normalize_for_cmu(toks[0])
    used_fallback = False
    used_dictapi = False

    prons = None
    if key in cmu:
      prons = cmu[key]
    elif key.replace("'", '') in cmu:
      prons = cmu[key.replace("'", '')]
    elif key.endswith('s') and key[:-1] in cmu:
      prons = cmu[key[:-1]]

    if prons:
      ipas = [arpabet_pron_to_ipa(p) for p in prons]
      uniq = []
      for x in ipas:
        if x not in uniq:
          uniq.append(x)
      if len(uniq) == 1:
        return f"/{uniq[0]}/", len(uniq), used_fallback, used_dictapi
      joined = ' or '.join(f"/{u}/" for u in uniq[:3])
      return joined, len(uniq), used_fallback, used_dictapi

    # fallback token
    tok_ipa, used_fallback, used_dictapi = token_ipa_from_fallback(key)
    return f"/{tok_ipa}/", 0, used_fallback, used_dictapi

  # phrase
  parts = []
  used_fallback_any = False
  used_dictapi_any = False
  for t in toks:
    key = normalize_for_cmu(t)
    if not key:
      continue

    if key in cmu:
      token_ipa = arpabet_pron_to_ipa(cmu[key][0])
    elif key.replace("'", '') in cmu:
      token_ipa = arpabet_pron_to_ipa(cmu[key.replace("'", '')][0])
    elif key.endswith('s') and key[:-1] in cmu:
      token_ipa = arpabet_pron_to_ipa(cmu[key[:-1]][0])
    else:
      token_ipa, uf, ud = token_ipa_from_fallback(key)
      used_fallback_any = used_fallback_any or uf
      used_dictapi_any = used_dictapi_any or ud

    parts.append(token_ipa)

  return f"/{' '.join(parts)}/", 0, used_fallback_any, used_dictapi_any

# --- mapping audits ---
missing_in_index = []
missing_audio_files = []
filename_mismatches = []
duplicate_files = defaultdict(list)

for w, info in files_map.items():
  duplicate_files[info.get('file')].append(w)

for w in words:
  if w not in files_map:
    missing_in_index.append(w)
    continue
  file = files_map[w].get('file')
  if not file:
    missing_audio_files.append((w, None, 'no file field'))
    continue
  if file not in actual_audio:
    missing_audio_files.append((w, file, 'file not found in audio/'))
  expected = slugify_filename(w)
  if file != expected:
    filename_mismatches.append((w, expected, file))

extra_audio_files = [fn for fn in sorted(actual_audio) if fn not in duplicate_files]
multi_map_files = {fn:ws for fn,ws in duplicate_files.items() if fn and len(ws) > 1}

# --- generate report ---
level_risk = defaultdict(Counter)
safe = warn = danger = 0
danger_words = []

lines = []

for w in words:
  level_list = level_map.get(w, [])
  level = level_list[0] if level_list else '?'

  idxinfo = files_map.get(w)
  source = idxinfo.get('source') if idxinfo else 'unknown'
  ipa, cmu_prons_count, used_fallback, used_dictapi = word_ipa(w)

  risk, reason = assess_tts_risk(w, source, cmu_prons_count, used_fallback, used_dictapi)

  if risk == '🟢 SAFE':
    safe += 1
    status = '✅'
    risk_text = 'SAFE'
  elif risk == '🟡 WARN':
    warn += 1
    status = '⚠️'
    risk_text = '🟡 WARN'
  else:
    danger += 1
    status = '❌'
    risk_text = '🔴 DANGER'
    danger_words.append(w)

  level_risk[str(level)][risk_text] += 1

  mapping_note = ''
  if w not in files_map:
    mapping_note = ' — MISSING_IN_AUDIO_INDEX'
  else:
    f = files_map[w].get('file')
    if not f:
      mapping_note = ' — MISSING_FILE_FIELD'
    else:
      expected = slugify_filename(w)
      if f != expected:
        mapping_note = f" — FILENAME_MISMATCH expected {expected} got {f}"
      if f not in actual_audio:
        mapping_note += ('' if mapping_note else ' —') + ' AUDIO_FILE_NOT_FOUND'
      if f in multi_map_files:
        mapping_note += f" — DUPLICATE_FILE_MAPPED({len(multi_map_files[f])} words)"

  if reason:
    line = f"{status} {w} — {ipa} — {source} — {risk_text} — {reason} — level:{level}{mapping_note}"
  else:
    line = f"{status} {w} — {ipa} — {source} — {risk_text} — level:{level}{mapping_note}"
  lines.append(line)

report = []
report.append('# PRONUNCIATION AUDIT (GPT)')
report.append('')
report.extend(lines)
report.append('')
report.append('## 统计摘要')
report.append(f"- 总词数: {len(words)}")
report.append(f"- SAFE: {safe}")
report.append(f"- WARN: {warn}")
report.append(f"- DANGER: {danger}")
report.append('')
report.append(f"### DANGER词列表 ({danger})")
for w in danger_words:
  report.append(f"- {w}")

report.append('')
report.append('### 按level分的风险分布')
for lvl in sorted(level_risk.keys(), key=lambda x: (len(x), x)):
  c = level_risk[lvl]
  report.append(f"- level {lvl}: SAFE {c.get('SAFE',0)} | WARN {c.get('🟡 WARN',0)} | DANGER {c.get('🔴 DANGER',0)}")

report.append('')
report.append('## 文件映射/完整性审查')
report.append(f"- audio-index.json entries: {len(files_map)}")
report.append(f"- audio/ mp3 files: {len(actual_audio)}")
report.append(f"- missing words in audio-index: {len(missing_in_index)}")
report.append(f"- missing audio files on disk (by word mapping): {len(missing_audio_files)}")
report.append(f"- filename mismatches vs slugify expectation: {len(filename_mismatches)}")
report.append(f"- extra audio files not referenced by any word: {len(extra_audio_files)}")
report.append(f"- duplicate file->multiple words mappings: {len(multi_map_files)}")

if missing_in_index:
  report.append('')
  report.append('### Missing in audio-index.json')
  for w in missing_in_index:
    report.append(f"- {w}")

if missing_audio_files:
  report.append('')
  report.append('### Missing audio files referenced by index')
  for w, f, why in missing_audio_files[:2000]:
    report.append(f"- {w}: {f} ({why})")

if multi_map_files:
  report.append('')
  report.append('### Duplicate file mapped from multiple words')
  for fn, ws in sorted(multi_map_files.items(), key=lambda x: (-len(x[1]), x[0])):
    report.append(f"- {fn}: {', '.join(ws[:10])}{' ...' if len(ws)>10 else ''}")

if extra_audio_files:
  report.append('')
  report.append('### Extra audio files (not referenced) — sample')
  for fn in extra_audio_files[:200]:
    report.append(f"- {fn}")
  if len(extra_audio_files) > 200:
    report.append(f"- ... ({len(extra_audio_files)-200} more)")

report.append('')
report.append('## IPA来源覆盖（CMU vs 在线回退）')
report.append(f"- unique missing tokens (CMU): {len(missing_tokens)}")
report.append(f"- Datamuse(ARPABET) fetched: {len(fallback_arpabet)}")
report.append(f"- DictionaryAPI(IPA) fetched: {len(dictapi_ipa)}")
report.append(f"- fallback failures: {len(fallback_fail)}")
if fallback_fail:
  report.append('')
  report.append('### Fallback failures (token)')
  for tok in sorted(fallback_fail.keys()):
    report.append(f"- {tok}")

open(OUT_PATH, 'w', encoding='utf-8').write('\n'.join(report) + '\n')

# Quick sanity: look for obvious placeholders like '/token/' for tokens we couldn't resolve.
# We won't fail the run, but we will print counts.
with open(OUT_PATH, 'r', encoding='utf-8') as f:
  text = f.read()

print('Wrote', OUT_PATH)
print('Summary:', len(words), safe, warn, danger)
print('Fallback:', len(missing_tokens), 'datamuse', len(fallback_arpabet), 'dictapi', len(dictapi_ipa), 'fail', len(fallback_fail))
print('Index missing words:', len(missing_in_index))
print('Missing audio files:', len(missing_audio_files))
print('Filename mismatches:', len(filename_mismatches))
print('Extra audio files:', len(extra_audio_files))
print('Duplicate file mappings:', len(multi_map_files))
