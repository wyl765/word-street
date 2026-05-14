# Edge TTS Pronunciation Audit Report

**Date:** 2026-05-14  
**Voice:** Microsoft Edge Neural TTS (en-US-AndrewNeural)  
**Total words audited:** 1,467 (1,326 single words + 141 phrases)  
**Cross-referenced against:** PRONUNCIATION-AUDIT-GPT.md, PRONUNCIATION-FIX-REPORT.md

---

## Executive Summary

| Category | Count |
|----------|-------|
| ✅ PASS (no pronunciation concern) | 1,452 |
| ⚠️ WARN (possible issue, needs human spot-check) | 12 |
| 🔴 DANGER (high risk of incorrect pronunciation) | 3 |

**Overall assessment: LOW RISK.** The vast majority of edge-tts words are single-pronunciation words or phrases where AndrewNeural performs well. The 13 most dangerous heteronyms identified in the prior three-model audit have already been resolved (5 with Cambridge human recordings, 8 confirmed TTS-default-correct). Three new risks are identified below.

---

## 🔴 DANGER — High Risk of Incorrect Pronunciation (3)

These words have a real risk of being pronounced incorrectly by TTS based on their word bank usage.

### 1. `alternate` (verb sense)
- **Word bank definition:** "to switch back and forth" (verb)
- **Correct pronunciation:** /ˈɔːltərˌneɪt/ (verb, with full -eɪt ending)
- **TTS risk:** AndrewNeural may default to /ˈɔːltərnət/ (adjective, with reduced -ət ending)
- **Impact:** Student learns adjective pronunciation for a verb — the -eɪt vs -ət distinction is meaningful
- **Recommendation:** Replace with human recording (Cambridge/Forvo verb pronunciation)

### 2. `extract` (verb sense)
- **Word bank definition:** "to pull out or take away" (verb)
- **Correct pronunciation:** /ɪkˈstrækt/ (verb, stress on second syllable)
- **TTS risk:** AndrewNeural may default to /ˈɛkstrækt/ (noun, stress on first syllable)
- **Impact:** Wrong stress pattern teaches incorrect pronunciation
- **Recommendation:** Replace with human recording of verb pronunciation

### 3. `coordinate` (verb sense)
- **Word bank definition:** "to organize people or things so they work together" (verb)
- **Correct pronunciation:** /koʊˈɔːrdɪˌneɪt/ (verb, full -eɪt ending)
- **TTS risk:** AndrewNeural may say /koʊˈɔːrdɪnət/ (noun/adjective, reduced -ət)
- **Impact:** The -eɪt vs -ət distinction matters for this heteronym
- **Recommendation:** Replace with human recording of verb pronunciation

---

## ⚠️ WARN — Possible Issues, Needs Human Spot-Check (12)

### Heteronyms where TTS default likely matches but should be verified

| # | Word | Word Bank Sense | TTS Default Likely OK? | Risk |
|---|------|----------------|----------------------|------|
| 1 | `aggregate` | noun "a total" | ✅ Likely /ˈæɡrɪɡət/ | Low — TTS defaults to noun |
| 2 | `appropriate` | adj "right or fitting" | ✅ Likely /əˈproʊpriət/ | Low — confirmed in fix report |
| 3 | `approximate` | adj "close to real number" | ✅ Likely /əˈprɑːksɪmət/ | Low — TTS defaults to adj |
| 4 | `attribute` | noun "a quality" | ✅ Likely /ˈætrɪbjuːt/ | Low — confirmed in fix report |
| 5 | `deliberate` | adj "done on purpose" | ✅ Likely /dɪˈlɪbərət/ | Low — confirmed in fix report |
| 6 | `project` | noun "planned work" | ✅ Likely /ˈprɑːdʒɛkt/ | Low — confirmed in fix report |
| 7 | `recall` | verb "to remember" | ✅ Likely /rɪˈkɔːl/ | Low — TTS defaults to verb |
| 8 | `segment` | noun "one piece" | ✅ Likely /ˈsɛɡmənt/ | Low — TTS defaults to noun |
| 9 | `subordinate` | adj "lower in rank" | ✅ Likely /səˈbɔːrdɪnət/ | Low — confirmed in fix report |
| 10 | `supplement` | noun "an extra thing" | ✅ Likely /ˈsʌplɪmənt/ | Low — TTS defaults to noun |
| 11 | `survey` | "asking questions" | ✅ Both /ˈsɜːrveɪ/ acceptable | Low |

### Foreign-origin words where TTS might mispronounce

| # | Word | Concern | Risk |
|---|------|---------|------|
| 12 | `coup` | French-origin. TTS must say /kuː/ not /kaʊp/. AndrewNeural almost certainly handles this correctly, but worth a quick listen. | Low |

### Phrase-specific TTS concerns

The 141 phrases are generally LOW RISK for AndrewNeural. Edge Neural TTS handles multi-word phrases and idioms well with natural prosody. The prior GPT audit flagged all phrases as WARN for "possible stress/pause issues," but this is a generic caution rather than a specific risk. Notable items:

| Phrase | Concern |
|--------|---------|
| `GDP (gross domestic product)` | TTS will read parenthetical content. File is named `gross_domestic_product.mp3`, suggesting the TTS was fed "gross domestic product" without the acronym — ✅ correct approach |
| `practice makes perfect` | "perfect" could get verb stress /pərˈfɛkt/ instead of adj /ˈpɜːrfɪkt/. AndrewNeural likely handles this idiom correctly as it's a common phrase. |
| `use up` | "use" should be /juːz/ (verb) not /juːs/ (noun). AndrewNeural handles phrasal verbs well. |
| `don't judge a book by its cover` | Apostrophe in word → filename uses `don_t`. Mapping works correctly. |
| `not only...but also` | Ellipsis in word text. TTS may pause oddly at "..." — worth a listen. |

---

## Filename Mapping Audit

All 1,467 files have consistent word→filename mappings. Two minor notes:

1. **`don't judge a book by its cover`** → `don_t_judge_a_book_by_its_cover.mp3` — apostrophe replaced with `_t`, functional ✅
2. **`GDP (gross domestic product)`** → `gross_domestic_product.mp3` — parenthetical content used as filename, appropriate since TTS read the expanded form ✅

---

## Cross-Reference with Prior Audits

### Previously identified DANGER items — Status

All 13 high-danger heteronyms from the three-model audit (PRONUNCIATION-FIX-REPORT.md) have been addressed:
- **5 words** now use Cambridge human recordings: contrast, transport, graduate, delegate, convict ✅
- **8 words** confirmed TTS-default matches intended sense: appropriate, attribute, project, subordinate, deliberate, by contrast, in contrast, live up to ✅

### NEW risks not caught in prior audits

The 3 DANGER items above (`alternate`, `extract`, `coordinate`) were not in the prior fix report's scope:
- `alternate` and `extract` were flagged as "single-model DANGER only" (Claude-only) in the fix report but not acted on
- `coordinate` was not flagged by any prior model — **this is a new finding**

---

## Recommendations

### Immediate (before launch)
1. **Replace 3 DANGER words** with human recordings (Cambridge Dictionary verb pronunciations):
   - `alternate` — verb /ˈɔːltərˌneɪt/
   - `extract` — verb /ɪkˈstrækt/  
   - `coordinate` — verb /koʊˈɔːrdɪˌneɪt/

### Optional (quality improvement)
2. **Spot-listen to `coup`** — verify AndrewNeural says /kuː/ not /kaʊp/
3. **Spot-listen to `not only...but also`** — verify ellipsis handling
4. **Spot-listen to `practice makes perfect`** — verify "perfect" gets adjective stress

### No action needed
- The remaining 1,452 words are phonologically unambiguous or have TTS defaults that match the intended sense
- AndrewNeural (en-US) is a high-quality neural voice that handles standard American English vocabulary reliably
- Phrase prosody is generally excellent for this voice

---

## Methodology

This audit was conducted by:
1. Extracting all 1,467 edge-tts-andrew-neural entries from `audio-index.json`
2. Cross-referencing with the comprehensive GPT pronunciation audit (5,205 words with IPA)
3. Cross-referencing with the fix report (13 resolved heteronyms)
4. Independent phonological analysis of all heteronyms still on edge-tts (14 identified)
5. Checking word bank definitions to determine intended part of speech for each heteronym
6. Assessing TTS default pronunciation against intended usage
7. Reviewing all 141 phrases for TTS-specific risks (stress, pauses, word boundaries)
8. Verifying filename mappings for all 1,467 entries
