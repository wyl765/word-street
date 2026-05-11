# Adversarial Attack Report

## Summary
- Total words attacked: 5205
- Problems found: 3
- CRITICAL: 1 (factually wrong)
- HIGH: 0 (misleading)  
- MEDIUM: 2 (imprecise)

## CRITICAL Issues
| word | file | attack_type | detail |
|---|---|---|---|
| inexorable | words-level4a.js | Factual attack / Garble detection | Definition is broken and effectively wrong: "moving forward steadily and stop or prevent; relentless" (missing the core meaning: **impossible to stop or prevent** / relentless). This could be mislearned as “moving forward and stop/prevent.” |

## HIGH Issues  
| word | file | attack_type | detail |
|---|---|---|---|

## MEDIUM Issues
| word | file | attack_type | detail |
|---|---|---|---|
| life cycle | words-level2b.js | Garble detection | Typo in definition: "...goes through **from from** birth to death" (duplicate word). |
| inexorable | words-level4a.js | Example contradiction / Usage error | Example has clear grammar error: "...means **all grows** older" → should be "all **grow**" or "everyone **grows**". This distracts and may confuse learners. |
