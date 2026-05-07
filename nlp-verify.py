#!/usr/bin/env python3
"""
Word Street — Advanced NLP Verification Suite
1. WordNet semantic validation
2. Collocation verification  
3. Dale-Chall complexity check
4. Word embedding similarity (using WordNet path similarity as proxy)
"""

import json
import re
import os
import sys
from collections import defaultdict

# NLTK imports
import nltk
from nltk.corpus import wordnet as wn
from nltk.corpus import brown

# Load word-street entries
DIR = os.path.dirname(os.path.abspath(__file__))
entries = []
for fname in sorted(os.listdir(DIR)):
    if not re.match(r'^words-level.*\.js$', fname):
        continue
    with open(os.path.join(DIR, fname), 'r') as f:
        content = f.read()
    for m in re.finditer(r'\{"word":"([^"]+)","level":(\d+),"definition":"([^"]+)","example":"([^"]+)","imageKeyword":"([^"]+)"\}', content):
        entries.append({
            'word': m.group(1),
            'level': int(m.group(2)),
            'definition': m.group(3),
            'example': m.group(4),
            'imageKeyword': m.group(5),
            'file': fname
        })

print(f"📚 Loaded {len(entries)} entries")
print("=" * 60)

# ============================================================
# 1. WORDNET SEMANTIC VALIDATION
# ============================================================
print("\n🧠 1. WordNet Semantic Validation")
print("-" * 40)

wordnet_issues = []

for e in entries:
    word = e['word'].lower().replace(' ', '_')
    synsets = wn.synsets(word)
    
    if not synsets:
        continue  # Skip multi-word / not in WordNet
    
    definition = e['definition'].lower()
    
    # Check if our definition matches any WordNet sense
    best_match = 0
    for ss in synsets[:3]:  # Check top 3 senses
        wn_def = ss.definition().lower()
        # Simple word overlap
        our_words = set(definition.split())
        wn_words = set(wn_def.split())
        if len(our_words) > 0:
            overlap = len(our_words & wn_words) / len(our_words)
            best_match = max(best_match, overlap)
    
    # Flag if very low overlap with all WordNet senses
    if best_match < 0.1 and len(synsets) > 0 and e['level'] <= 3:
        # Get WordNet's definition for comparison
        wn_defs = [s.definition() for s in synsets[:2]]
        wordnet_issues.append({
            'word': e['word'],
            'level': e['level'],
            'file': e['file'],
            'our_def': e['definition'],
            'wn_defs': wn_defs,
            'overlap': best_match
        })

print(f"  Definitions with low WordNet alignment (L1-3): {len(wordnet_issues)}")
for issue in wordnet_issues[:15]:
    print(f"  ⚠️  {issue['word']} (L{issue['level']})")
    print(f"     Ours: {issue['our_def']}")
    print(f"     WN:   {issue['wn_defs'][0][:80]}")
    print()

# ============================================================
# 2. DALE-CHALL WORD COMPLEXITY
# ============================================================
print("\n📖 2. Dale-Chall Complexity Check")
print("-" * 40)

# Dale-Chall "easy" words (3000 words a 4th grader knows)
# We'll use a simplified version - words that appear in Brown corpus at high frequency
brown_words = set()
try:
    brown_freq = nltk.FreqDist(w.lower() for w in brown.words())
    # Top 3000 most common = "easy" words
    brown_words = set(w for w, _ in brown_freq.most_common(3000))
except:
    pass

dale_chall_issues = []
if brown_words:
    for e in entries:
        if e['level'] > 2:
            continue
        def_words = re.findall(r'[a-z]+', e['definition'].lower())
        hard_in_def = [w for w in def_words if w not in brown_words and len(w) > 4]
        if len(hard_in_def) >= 2:  # 2+ hard words in a L1-2 definition
            dale_chall_issues.append({
                'word': e['word'],
                'level': e['level'],
                'file': e['file'],
                'definition': e['definition'],
                'hard_words': hard_in_def
            })
    
    print(f"  L1-2 definitions using complex words: {len(dale_chall_issues)}")
    for issue in dale_chall_issues[:10]:
        print(f"  ⚠️  {issue['word']} (L{issue['level']}): hard words = {issue['hard_words']}")
else:
    print("  [Brown corpus not available]")

# ============================================================
# 3. WORDNET PATH SIMILARITY (Semantic Duplicates)
# ============================================================
print("\n🔗 3. Semantic Similarity (WordNet Path)")
print("-" * 40)

# Find word pairs within same level that are semantically too close
semantic_dupes = []
by_level = defaultdict(list)
for e in entries:
    by_level[e['level']].append(e)

for level, level_entries in by_level.items():
    if level > 3:
        continue  # Focus on L1-3
    
    synset_cache = {}
    for e in level_entries:
        word = e['word'].lower().replace(' ', '_')
        ss = wn.synsets(word)
        if ss:
            synset_cache[e['word']] = ss[0]  # First sense
    
    words_with_synsets = list(synset_cache.keys())
    for i in range(len(words_with_synsets)):
        for j in range(i+1, len(words_with_synsets)):
            w1, w2 = words_with_synsets[i], words_with_synsets[j]
            sim = synset_cache[w1].path_similarity(synset_cache[w2])
            if sim and sim >= 0.5:  # Very high similarity
                semantic_dupes.append({
                    'level': level,
                    'word1': w1,
                    'word2': w2,
                    'similarity': sim
                })

semantic_dupes.sort(key=lambda x: -x['similarity'])
print(f"  Semantically near-identical pairs (L1-3): {len(semantic_dupes)}")
for d in semantic_dupes[:15]:
    print(f"  ⚠️  L{d['level']}: {d['word1']} ↔ {d['word2']} (sim={d['similarity']:.2f})")

# ============================================================
# 4. COLLOCATION VERIFICATION (Brown corpus)
# ============================================================
print("\n📝 4. Collocation Check (Example Sentences)")
print("-" * 40)

collocation_issues = []
if brown_words:
    # Check for unnatural word combinations in examples
    # Simple check: flag examples where key phrases are unusual
    unusual_patterns = [
        (r'temperature was (?:very )?(?:cold|hot|warm)', 'temperature + cold/hot is unnatural, use high/low'),
        (r'slurp.* with .* spoon', 'slurp + spoon is contradictory'),
        (r'on (?:her|his|my) arm.*bracelet', 'bracelet goes on wrist not arm'),
    ]
    
    for e in entries:
        example = e['example'].lower()
        for pattern, reason in unusual_patterns:
            if re.search(pattern, example):
                collocation_issues.append({
                    'word': e['word'],
                    'file': e['file'],
                    'example': e['example'],
                    'reason': reason
                })

    print(f"  Unnatural collocations found: {len(collocation_issues)}")
    for issue in collocation_issues:
        print(f"  ⚠️  {issue['word']}: {issue['reason']}")
else:
    print("  [Corpus not available]")

# ============================================================
# SUMMARY & SAVE REPORT
# ============================================================
print("\n" + "=" * 60)
print("📊 SUMMARY")
print(f"  WordNet alignment issues: {len(wordnet_issues)}")
print(f"  Dale-Chall complexity issues: {len(dale_chall_issues)}")
print(f"  Semantic near-duplicates: {len(semantic_dupes)}")
print(f"  Collocation issues: {len(collocation_issues)}")

# Save report
report = f"""# NLP Verification Report — {__import__('datetime').date.today()}

## 1. WordNet Semantic Alignment (L1-3)
Issues: {len(wordnet_issues)}

{chr(10).join(f"- {i['word']} (L{i['level']}): our def='{i['our_def']}' vs WN='{i['wn_defs'][0][:80]}'" for i in wordnet_issues[:30])}

## 2. Dale-Chall Complexity (L1-2 definitions using hard words)
Issues: {len(dale_chall_issues)}

{chr(10).join(f"- {i['word']} (L{i['level']}): hard words = {i['hard_words']}" for i in dale_chall_issues[:30])}

## 3. Semantic Near-Duplicates (WordNet path similarity ≥0.5)
Pairs: {len(semantic_dupes)}

{chr(10).join(f"- L{d['level']}: {d['word1']} ↔ {d['word2']} (sim={d['similarity']:.2f})" for d in semantic_dupes[:30])}

## 4. Collocation Issues
Issues: {len(collocation_issues)}

{chr(10).join(f"- {i['word']}: {i['reason']}" for i in collocation_issues)}
"""

with open(os.path.join(DIR, f"NLP-VERIFY-{__import__('datetime').date.today()}.md"), 'w') as f:
    f.write(report)

print("\n📝 Report saved to NLP-VERIFY-*.md")
