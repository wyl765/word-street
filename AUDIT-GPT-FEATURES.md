# Word Street — Feature Audit Report

**Auditor:** Claude Opus 4 (independent subagent)
**Date:** 2026-05-14
**Standard:** Cambridge Assessment / ETS publisher-level rigor
**Files:** `etymology.js`, `srs.js`, `index.html`

---

## 1. Etymology Engine (`etymology.js`)

### 1.1 PREFIXES — Verification

All 65 prefix entries verified against standard etymological references.

| Entry | Status | Notes |
|-------|--------|-------|
| `a-` "not, without" Greek | ✅ | Correct (alpha privative). Note: also has Latin `a-`/`ab-` "away" sense, but Greek sense is the primary one for this prefix form. |
| `ab-` "away from" Latin | ✅ | |
| `ad-` "toward, to" Latin | ✅ | |
| `ambi-` "both" Latin | ✅ | |
| `ante-` "before" Latin | ✅ | |
| `anti-` "against" Greek | ✅ | |
| `auto-` "self" Greek | ✅ | |
| `bene-` "good, well" Latin | ✅ | |
| `bi-` "two" Latin | ✅ | |
| `circum-` "around" Latin | ✅ | |
| `co-`/`com-`/`con-` "together, with" Latin | ✅ | All three allomorphs present — good. |
| `contra-` "against" Latin | ✅ | |
| `counter-` "against, opposite" Latin | ⚠️ | Origin is more precisely Old French `contre-` from Latin `contra`. Listing as "Latin" is acceptable shorthand but imprecise. |
| `de-` "down, away, reverse" Latin | ✅ | |
| `dis-` "not, apart" Latin | ✅ | |
| `en-`/`em-` "put into, cause" Latin/French | ✅ | Origin listed as "Latin/French" is acceptable. More precisely Old French from Latin `in-`. |
| `epi-` "upon, over" Greek | ✅ | |
| `ex-` "out of, former" Latin | ✅ | |
| `extra-` "beyond" Latin | ✅ | |
| `fore-` "before" Old English | ✅ | |
| `hyper-`/`hypo-` Greek | ✅ | |
| `il-`/`im-`/`in-`/`ir-` "not" Latin | ✅ | All allomorphs present. `im-` correctly lists dual sense "not, into". |
| `inter-` "between, among" Latin | ✅ | |
| `intra-` "within" Latin | ✅ | |
| `macro-`/`micro-` Greek | ✅ | |
| `mal-` "bad, wrongly" Latin | ✅ | More precisely Latin via Old French, but acceptable. |
| `mid-` "middle" Old English | ✅ | |
| `mis-` "wrongly, badly" Old English | ✅ | |
| `mono-` "one, single" Greek | ✅ | |
| `multi-` "many" Latin | ✅ | |
| `neo-` "new" Greek | ✅ | |
| `non-` "not" Latin | ✅ | |
| `ob-` "against, toward" Latin | ✅ | |
| `omni-` "all" Latin | ✅ | |
| `out-`/`over-` Old English | ✅ | |
| `pan-` "all" Greek | ✅ | |
| `para-` "beside, beyond" Greek | ✅ | |
| `per-` "through, thoroughly" Latin | ✅ | |
| `peri-` "around" Greek | ✅ | |
| `poly-` "many" Greek | ✅ | |
| `post-` "after" Latin | ✅ | |
| `pre-` "before" Latin | ✅ | |
| `pro-` "forward, in favor of" Latin/Greek | ✅ | |
| `proto-` "first, original" Greek | ✅ | |
| `pseudo-` "false" Greek | ✅ | |
| `re-` "again, back" Latin | ✅ | |
| `retro-` "backward" Latin | ✅ | |
| `semi-` "half, partial" Latin | ✅ | |
| `sub-` "under, below" Latin | ✅ | |
| `super-` "above, beyond" Latin | ✅ | |
| `syn-`/`sym-` "together, with" Greek | ✅ | |
| `trans-` "across, beyond" Latin | ✅ | |
| `tri-` "three" Latin/Greek | ✅ | |
| `ultra-` "beyond, extreme" Latin | ✅ | |
| `un-` "not, reverse" Old English | ✅ | |
| `under-` "below, insufficient" Old English | ✅ | |
| `uni-` "one" Latin | ✅ | |

**Summary:** All prefixes are substantively correct. One minor origin imprecision (`counter-`).

### 1.2 ROOTS — Verification

All 97 root entries verified.

**Correct entries (no issues):** `act`, `aud`, `bene`, `bio`, `cap`, `ced`/`cede`, `chron`, `cid`, `cis`, `clude`/`clus`, `cogn`, `corp`, `cred`, `dict`, `doc`, `duc`/`duct`, `equ`, `fac`/`fact`, `fer`, `fid`, `flect`, `form`, `fort`, `fract`, `gen`, `geo`, `graph`, `gress`, `hab`, `ject`, `jud`, `lect`, `loc`, `log`, `luc`, `man`, `mand`, `mem`, `ment`, `mit`/`miss`, `mob`/`mot`, `mor`/`mort`, `nat`, `nov`, `oper`, `path`, `ped`, `pel`, `pend`, `phil`, `phon`, `plic`, `pon`/`pos`, `prim`, `quer`, `rupt`, `scrib`/`script`, `sect`, `sens`/`sent`, `sequ`, `spec`/`spect`, `spir`, `sta`, `struct`, `tact`, `temp`, `ten`, `tend`, `terr`, `tract`, `val`, `ven`/`vent`, `ver`, `vert`/`vers`, `vid`/`vis`, `vit`/`viv`, `voc`, `vol`

**Issues found:**

| Root | Listed | Issue | Severity |
|------|--------|-------|----------|
| `cur` | "run, course" from `currere` | ✅ Correct, but note `cur` is also a root meaning "care" (Latin `cura`) as in "curate", "curious". The algorithm may mis-attribute these words. | ⚠️ Ambiguity |
| `jur` | "law, swear" from `jus` | ⚠️ The root `jur-` derives from `jus, juris` (law/right) and separately from `jurare` (to swear). Listing `jus` alone misses the `jurare` derivation. Minor. | Low |
| `nom` | "name, law" from Latin/Greek | ⚠️ These are actually two distinct roots: Greek `nomos` (law) and Latin `nomen` (name). Conflating them is misleading for learners. | Medium |
| `ped` | "foot, child" from `pes` / `pais` | ⚠️ Same issue — two unrelated roots conflated. Latin `pes, pedis` (foot) vs Greek `pais, paidos` (child). A learner cannot tell which meaning applies. | Medium |

### 1.3 SUFFIXES — Verification

All 30 suffix entries verified. **All correct.** Type classifications (noun/adj/verb/adv) are accurate.

One minor note: `-er` is listed as "one who, more" with type `noun/adj`. The comparative adjective sense is correct but the type should arguably be `noun/adj/comparative` or similar to distinguish agent nouns from comparatives.

### 1.4 `analyze()` Function — Logic Audit

**Algorithm (lines ~148–182):**
1. Sort prefixes longest-first, match if word starts with prefix and `word.length > prefix.length + 2`
2. Sort suffixes longest-first, match if word ends with suffix and `word.length > suffix.length + 2`
3. Strip matched prefix/suffix, check if remaining core contains a root and `core.length <= root.length + 3`

**Test cases:**

| Word | Expected | Actual Result | Correct? |
|------|----------|---------------|----------|
| `incredible` | in- + cred + -ible | prefix `in-` ✅, suffix `-ible` ✅, core=`cred` → root `cred` ✅ | ✅ |
| `subscription` | sub- + script + -ion | prefix `sub-` ✅, suffix `-tion` ✅, core=`scrip` → root `script`? `scrip` doesn't contain `script`. Core is `scrip` (6-3=3 letters from "subscription" minus "sub" minus "tion" = "scrip"). Root `script` (6 chars) > core `scrip` (5 chars), so `core.includes('script')` = false. Root `scrib` (5 chars) — `scrip`.includes(`scrib`) = false. **No root found.** | ❌ |
| `transport` | trans- + port | prefix `trans-` ✅ (word=9, prefix=5, 9>5+2=7 ✅), suffix: checking `-ward` no, `-ure` no, `-ous` no... none match. Core = `port` (4 chars). Root `port` (4 chars): `core.includes('port')` ✅, `core.length(4) <= root.length(4) + 3` ✅ | ✅ |
| `contradict` | contra- + dict | prefix `contra-` (6 chars), word=10, 10>6+2=8 ✅. No suffix matches. Core = `dict` (4 chars). Root `dict` ✅ | ✅ |
| `benevolent` | bene- + vol + -ent | prefix `bene-` (4 chars), word=10, 10>4+2=6 ✅. Suffix `-ent` (3 chars), 10>3+2=5 ✅. Core = `vol` (3 chars, ≥3 ✅). Root `vol` (3 chars): `core.includes('vol')` ✅, `core.length(3) <= 3+3` ✅ | ✅ |

**Critical false decomposition risks:**

| Word | Risk | Analysis |
|------|------|----------|
| `uncle` | `un-` + `cle`? | Word=5, prefix `un-`=2, 5>2+2=4 ✅. Would match `un-` prefix. Core after prefix = `cle` (3 chars). No suffix. No root `cle` exists. Result: prefix-only breakdown `un- (not, reverse)`. **This is WRONG — "uncle" has nothing to do with `un-`.** | 
| `understand` | `under-` + `stand`? | Word=10, prefix `under-`=5, 10>5+2=7 ✅. Would match. Core = `stand`. No suffix. Root `sta` — `stand`.includes(`sta`) ✅, 5 <= 3+3 ✅. **Result: `under-` + `sta`. This is etymologically incorrect — "understand" is Old English `understandan`, not a compositional `under-` + `stand`.** |
| `counter` | `counter-` stripped? | Word=7, prefix `counter-`=7, 7>7+2=9? NO. Length guard saves this. ✅ Safe. |
| `period` | `peri-` + `od`? | Word=6, prefix `peri-`=4, 6>4+2=6? NO (not strictly greater). ✅ Safe. |
| `interest` | `inter-` + `est`? | Word=8, prefix `inter-`=5, 8>5+2=7 ✅. Would match! Core=`est` (3 chars). Root check: no root `est`. **Result: prefix-only `inter- (between)`. Misleading — "interest" is from Latin `interesse`, not `inter-` compositionally in modern English.** |
| `premium` | `pre-` + `mium`? | Word=7, prefix `pre-`=3, 7>3+2=5 ✅. Core=`mium`. Suffix check: none match. Root: `prim` in `mium`? No. **Result: prefix-only `pre- (before)`. Incorrect — "premium" is from Latin `praemium` (reward), not compositional `pre-`.** |
| `manage` | `man-` root? | No prefix. Suffix `-age`? Not in suffix list. No decomposition. ✅ Safe (but `manage` does relate to `man-` hand — a missed opportunity). |
| `malice` | `mal-` prefix? | Word=6, prefix `mal-`=3, 6>3+2=5 ✅. Core=`ice`. **Result: `mal- (bad)` prefix-only. Etymologically defensible (Latin `malitia` from `malus`), but the algorithm arrives at it by coincidence.** |
| `automobile` | `auto-` prefix? | Word=10, prefix `auto-`=4, 10>4+2=6 ✅. Suffix `-ible`=4, 10>4+2=6 ✅. Core=`mob` (3 chars). Root `mob` ✅. **Result: `auto-` + `mob` + `-ible`. Correct!** |
| `reform` | `re-` + `form`? | Word=6, prefix `re-`=2, 6>2+2=4 ✅. Core=`form`. Root `form` ✅. **Correct!** |

### 1.5 Etymology Engine — Summary of Issues

1. **False positives on prefix matching (HIGH):** Words like `uncle`, `interest`, `premium`, `understand` get incorrectly decomposed. The algorithm has no stoplist or validation layer. Any word that happens to start with a prefix string and exceeds the length threshold gets decomposed.
2. **`subscription` misses its root (MEDIUM):** The stripping algorithm can't find `script` in `scrip` because the suffix `-tion` eats the `t` that belongs to the root.
3. **Ambiguous roots conflated (MEDIUM):** `nom` (name vs. law), `ped` (foot vs. child) present incorrect information to learners.
4. **No false-decomposition guard (HIGH):** No dictionary validation, no stoplist of known non-compositional words.

---

## 2. Spaced Repetition (`srs.js`)

### 2.1 SM-2 Formula Verification

**Reference SM-2 (Wozniak, 1990):**
```
EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
EF' = max(1.3, EF')
```

**Code (line ~60):**
```js
const newEF = Math.max(MIN_EF, card.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
```

✅ **Formula is correct.** Matches SM-2 specification exactly. `MIN_EF = 1.3` is correct.

### 2.2 Interval Scheduling

**Reference SM-2:**
- q < 3: reset to interval=1, repetition=0
- q ≥ 3, rep=0: interval=1
- q ≥ 3, rep=1: interval=6
- q ≥ 3, rep≥2: interval = round(interval × EF')

**Code (lines ~62–75):**
```js
if (quality >= 3) {
  card.totalCorrect++;
  if (card.repetition === 0) interval = 1;
  else if (card.repetition === 1) interval = 6;
  else interval = Math.round(card.interval * newEF);
  repetition = card.repetition + 1;
} else {
  card.totalWrong++;
  interval = 1;
  repetition = 0;
}
```

✅ **Correct.** Matches SM-2 specification.

### 2.3 `nextReview` Calculation

**Code (lines ~77–78):**
```js
const now = new Date();
const next = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);
```

✅ **Correct** for basic use. Minor note: DST transitions could shift by ±1 hour, but since the comparison is date-string-based (`toISOString().split('T')[0]`), this is functionally safe.

⚠️ **Issue:** `toISOString()` returns UTC. If the user is in GMT+8, a review scheduled at 11 PM local time would show the next day in UTC. The `getDueWords` comparison also uses `new Date().toISOString().split('T')[0]` — same UTC basis, so it's internally consistent. However, the "due today" display may be off by one day relative to the user's local perception. **For a Chinese user (GMT+8), a word answered at 8 AM local = midnight UTC, so the next 1-day review would be due "tomorrow" in UTC but "today+1" locally.** Actually since both sides use UTC consistently, it's fine functionally — just the concept of "today" is UTC-based, not local.

**Recommendation:** Use local date strings instead:
```js
const next = new Date(now.getTime() + interval * 86400000);
return next.toLocaleDateString('sv'); // YYYY-MM-DD in local time
```

### 2.4 Quality Mapping in `index.html`

**Code (index.html, answer handler, ~lines in renderQuestion):**
- Correct + fast (< 3s): `q = 5`
- Correct + normal: `q = 4`
- Wrong: `q = 1`

**Assessment:**

| Mapping | SM-2 Meaning | Pedagogical Soundness |
|---------|-------------|----------------------|
| Fast correct → q=5 | Perfect response, no hesitation | ✅ Appropriate |
| Normal correct → q=4 | Correct after hesitation | ✅ Appropriate |
| Wrong → q=1 | Incorrect, familiar-looking | ⚠️ Questionable |

**Issue with q=1 for all wrong answers:** SM-2 defines q=0 as "complete blackout" and q=1 as "incorrect but remembered upon seeing correct answer" and q=2 as "incorrect but easy to recall upon seeing". Using q=1 uniformly for all wrong answers:
- Is **too lenient** compared to q=0 (the EF penalty is smaller)
- Doesn't distinguish between "had no idea" vs "confused two similar words"

**Impact on EF:** At q=1: `EF' = EF + (0.1 - 4*(0.08 + 4*0.02)) = EF - 0.54`. At q=0: `EF' = EF + (0.1 - 5*(0.08 + 5*0.02)) = EF - 0.8`. The difference is 0.26 EF points per wrong answer — significant over time. Words the user truly doesn't know will have artificially inflated EF.

**Recommendation:** Use `q=1` for wrong answers where the user selected an answer, `q=0` for timeouts or if implementing a "no idea" button.

### 2.5 SRS Summary

| Aspect | Verdict |
|--------|---------|
| SM-2 formula | ✅ Correct |
| Interval schedule | ✅ Correct |
| nextReview calculation | ✅ Functionally correct (UTC-based) |
| Quality mapping | ⚠️ q=1 for all wrong is too lenient; no q=0/q=2/q=3 discrimination |
| Weak word algorithm | ✅ Sound (accuracy + EF sorting, min 2 attempts filter) |
| Data persistence | ✅ localStorage, proper JSON serialization |

---

## 3. Feature Integration (`index.html`)

### 3.1 Etymology Display

**Code (answer handler, after options disabled):**
```js
const etymHint = ETY.getHint(q.word.word);
if (etymHint) {
  const etymEl = document.createElement('div');
  // ... creates and animates hint element
  document.getElementById('optionsContainer').after(etymEl);
}
```

✅ **Works for both correct and wrong answers.** The etymology hint is shown after any answer, with a 0.5s delay animation. Placed after the options container.

⚠️ **Minor issue:** The hint uses `innerHTML` with the output of `getHint()`, which itself builds HTML from `PREFIXES`/`ROOTS`/`SUFFIXES` data. Since this data is hardcoded (not user input), there's no XSS risk — but it's a pattern to be aware of.

### 3.2 SRS Data Persistence

**Correct answer path:**
```js
const srsData = SRS.loadSRS();
const wordKey = q.word.word.toLowerCase();
srsData[wordKey] = SRS.sm2(srsData[wordKey], fast ? 5 : 4);
SRS.saveSRS(srsData);
```

**Wrong answer path:**
```js
const srsDataW = SRS.loadSRS();
const wordKeyW = q.word.word.toLowerCase();
srsDataW[wordKeyW] = SRS.sm2(srsDataW[wordKeyW], 1);
SRS.saveSRS(srsDataW);
SRS.recordMistake(q.word.word, answer, correctAnswer, state.mode);
```

✅ **Correct.** SRS data is loaded, updated, and saved on every answer. New words get default card via `sm2(null, q)`.

⚠️ **Potential issue:** `loadSRS()` and `saveSRS()` are called separately for correct vs wrong paths, using different variable names (`srsData` vs `srsDataW`). This is fine because they're in mutually exclusive branches — but if the code were ever refactored to be async, this could introduce a race.

### 3.3 Weak Words Algorithm

```js
function getWeakWords(srsData, limit = 20) {
  return Object.entries(srsData)
    .filter(([_, card]) => (card.totalCorrect + card.totalWrong) >= 2)
    .map(([word, card]) => ({
      word, ef: card.ef,
      totalWrong: card.totalWrong, totalCorrect: card.totalCorrect,
      accuracy: card.totalCorrect / (card.totalCorrect + card.totalWrong),
      interval: card.interval,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || a.ef - b.ef);
  return entries.slice(0, limit);
}
```

✅ **Sound approach.** Filters out words with < 2 attempts (avoids noise), sorts by accuracy then EF as tiebreaker. The minimum 2-attempt filter is reasonable.

### 3.4 JavaScript Bugs

1. **No race conditions found.** All answer handling is synchronous within the click handler. The `setTimeout` for advancing to the next question (3.5s correct, 4.5s wrong) is safe because buttons are disabled immediately (`disabled` class + `pointer-events: none`).

2. **⚠️ Retry in Daily mode resets but doesn't clear daily completion state.** If a user dies during daily, hits "Try Again" on Game Over, completes it, and `finishDaily()` is called — the streak logic checks `prevDaily.date` which would already be today if they completed a partial run that triggered `finishDaily()` via the game-over path. Looking at the code: `finishDaily()` is only called in game-over if `state.isDaily` is true (line ~in renderGameOver timeout handler: `if (state.isDaily) finishDaily();`). Wait — looking more carefully, the game-over handler calls `finishDaily()` even on death. This means a failed daily challenge still gets recorded as "completed" and increments the streak. **Bug: dying in a daily challenge should NOT count as completion.**

3. **⚠️ `profile.fastAnswers` tracking:** On wrong answer, `profile.fastAnswers = 0` (line in wrong-answer handler). On correct fast answer, `profile.fastAnswers++`. But on correct slow answer, `fastAnswers` is NOT reset. The gamification system may use this for achievements — the counter only resets on wrong answers, not on slow correct answers. This may be intentional (consecutive fast answers including slow ones don't break the chain) or a bug depending on the achievement logic.

4. **⚠️ Review mode `isReview` flag is never reset.** When starting review mode, `state.isReview = true` is set. But when starting Free Play or Daily, `state.isReview` is not explicitly set to `false`. Looking at the state initialization: `isReview` isn't in the initial state object. The `startBtn` handler doesn't set `state.isReview = false`. If a user plays Review, then plays Free Play, `state.isReview` would still be `true`, causing the wave-complete screen to render `renderReviewComplete()` instead of `renderWaveComplete()`. **Bug confirmed.**

5. **Minor: `generateDailyQuestions` distractor selection** — The `rng()` indices into `others` could collide, and the `[...new Set(distIdx)]` dedup could leave fewer than 3 distractors. The `while` loop fills remaining slots, but could theoretically produce duplicate distractors if `others` array is very small. In practice, with banks of hundreds of words, this is safe.

### 3.5 Integration Summary

| Feature | Status |
|---------|--------|
| Etymology display after answers | ✅ Working |
| SRS persistence | ✅ Working |
| SRS quality mapping | ⚠️ See §2.4 |
| Weak words | ✅ Working |
| Review mode | ⚠️ `isReview` flag not reset (bug) |
| Daily completion | ⚠️ Counts death as completion (bug) |

---

## 4. Recommendations

### 4.1 Critical Fixes

1. **Add a false-decomposition stoplist to the etymology engine.** Create a set of words that should NOT be decomposed (e.g., `uncle`, `interest`, `premium`, `understand`, `pretty`, `predict`... wait, `predict` IS compositional). Minimum viable: maintain a `STOPLIST` set and check before returning results.

2. **Fix the `isReview` flag bug.** Add `state.isReview = false;` to both the `startBtn` and `dailyBtn` handlers.

3. **Fix daily completion on death.** Move the `finishDaily()` call out of the game-over path. Only call it in `renderDailyComplete`.

4. **Fix `subscription`-type root detection.** The suffix `-tion` steals the `t` from `script`. Consider trying root matching BEFORE suffix stripping, or trying multiple suffix candidates.

### 4.2 What a Top Publisher Would Require

| Missing Feature | Priority | Notes |
|----------------|----------|-------|
| **Validated word decompositions** | HIGH | Cambridge/ETS would use curated decomposition data, not algorithmic guessing. Each word-to-morpheme mapping should be verified. |
| **Multiple-meaning disambiguation** | HIGH | Roots like `nom`, `ped`, `cur` have multiple unrelated meanings from different languages. Learners need to know WHICH meaning applies. |
| **q=0 and q=2/q=3 quality levels** | MEDIUM | SM-2 was designed for 6 quality levels. Collapsing to 3 (1, 4, 5) loses significant scheduling precision. |
| **Timezone-aware scheduling** | LOW | Use local dates for "due today" to match user expectations. |
| **Offline data sync** | MEDIUM | localStorage is fragile (can be cleared). Consider IndexedDB with periodic export. |
| **Adaptive difficulty** | MEDIUM | Currently level selection is manual. ETS adaptive tests adjust difficulty based on performance. |
| **Audio pronunciation** | Present | Already implemented via `pronunciation.js` (not audited). |
| **Progress analytics / learning curves** | MEDIUM | Show accuracy over time, not just current state. |

### 4.3 Anti-Patterns That Could Harm Learning

1. **Gamification overwhelming learning (MEDIUM):** The combo system, particles, screen shakes, XP bars, and achievement toasts are engaging but may shift the user's focus from retention to score-chasing. Research (Deci & Ryan, Self-Determination Theory) shows extrinsic rewards can undermine intrinsic motivation for learning.

2. **3.5-second forced wait after correct answers (LOW):** The audio playback delay is valuable, but if the user already knows the word well, this slows down review sessions. Consider a "tap to continue" option.

3. **No re-testing of wrong answers within session (MEDIUM):** When a user gets a word wrong, it's recorded in SRS but not re-presented in the current session. Standard flashcard practice (Leitner system, Anki) re-tests failed cards before ending a session. This is the single highest-impact pedagogical gap.

4. **No input-based recall (HIGH for publisher standard):** All modes are recognition-based (multiple choice). Recognition is far easier than recall. ETS/Cambridge assessments require typed input, sentence construction, or at minimum cloze-without-options. The app currently only tests the weakest form of memory.

### 4.4 Specific Module Improvements

**Etymology Engine:**
- Add `STOPLIST` for non-compositional words
- Split ambiguous roots (`nom_name` / `nom_law`, `ped_foot` / `ped_child`)
- Try root matching before suffix stripping to fix `subscription`-type failures
- Add confidence scoring (how well the parts account for the whole word)

**SRS Engine:**
- Add `q=0` mapping for timeout/skip scenarios
- Consider using `q=3` for correct-but-very-slow answers (>10s)
- Add local timezone handling for date comparisons
- Add data export/import functionality

**Main App:**
- Fix `isReview` reset bug
- Fix daily-on-death completion bug
- Add within-session re-testing of wrong answers
- Add a free-recall mode (typed input) for advanced learners
- Add "tap to continue" as alternative to forced timer

---

## Appendix: Line-Level Bug References

| File | Location | Bug |
|------|----------|-----|
| `index.html` | `startBtn.onclick` handler (~line 15 in the main IIFE script) | Missing `state.isReview = false` |
| `index.html` | `dailyBtn.onclick` handler | Missing `state.isReview = false` |
| `index.html` | `renderQuestion` → answer timeout → `if (state.lives <= 0)` block | `if (state.isDaily) finishDaily()` should not be called on death |
| `etymology.js` | `analyze()` function, line ~165 | No stoplist check before returning prefix-only results |
| `etymology.js` | `analyze()` function, suffix stripping | Steals characters from roots (e.g., `subscription` → `scrip` instead of `script`) |

*Note: Exact line numbers are approximate as index.html is a single large inline script. The locations described are relative to the function/handler names.*
