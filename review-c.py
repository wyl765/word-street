#!/usr/bin/env python3
"""Reviewer C - comprehensive imageKeyword quality review."""
import json
import re

# Manual fixes for genuinely bad keyword choices
MANUAL_FIXES = {
    # word -> (new_keyword, reason) - only for truly bad matches
    "realize": ("lightbulb moment", "mittens unrelated to understanding/realization"),
    "recently": ("recent calendar date", "shoelaces unrelated to time concept"),
    "selfish": ("child hoarding toys", "crayons don't convey selfishness"),
    "about": ("open book topic", "planets don't illustrate 'about'"),
    "adult": ("adult grown up person", "crosswalk doesn't show an adult"),
    "afraid": ("scared child hiding", "lamp doesn't convey fear"),
    "also": ("adding more items", "snack unrelated to 'in addition'"),
    "any": ("choosing from options", "pencils don't illustrate 'any/some'"),
    "basic": ("simple building blocks", "kindness doesn't illustrate 'basic/simple'"),
    "begin": ("starting line race", "whistle is weak connection to beginning"),
    "least": ("smallest portion", "paint doesn't illustrate 'smallest amount'"),
    "memory": ("photo album memories", "snowman doesn't illustrate memory/recall"),
    "usual": ("daily routine morning", "banana doesn't illustrate 'usual/typical'"),
    "little": ("tiny ladybug leaf", "seed is okay but ladybug is more clearly 'little'"),
    "simple": ("simple circle shape", "apple doesn't clearly illustrate 'simple/easy'"),
    "occasionally": ("sometimes calendar", "bike library doesn't illustrate 'sometimes'"),
    "skull": ("human skull", "diagram-style keyword, simplified"),
    "point out": ("finger pointing", "comma doesn't illustrate pointing out"),
    "frequently": ("ticking clock repeat", "giggling baby doesn't show frequency"),
    "immediately": ("running urgently", "school line doesn't show 'right away'"),
    "afterward": ("before and after", "clean up is weak for 'after that'"),
    "better": ("gold vs silver medal", "handwriting doesn't clearly show 'better'"),
    "careful": ("careful balancing glass", "scissors is a stretch for careful"),
    "common": ("common dandelion", "squirrel is okay but dandelion is more universally common"),
    "dark": ("dark night sky", "nightlight is the opposite of dark"),
    "inside": ("box with items inside", "envelope is okay but box is clearer"),
    "major": ("large important event", "storm doesn't clearly mean 'big/important'"),
    "matter": ("solid liquid gas", "air alone doesn't illustrate matter well"),
    "move": ("moving truck boxes", "chair doesn't clearly show movement"),
    "noisy": ("noisy crowd cheering", "cafeteria is okay but crowd is clearer"),
    "object": ("various objects table", "ball alone is just one object"),
    "order": ("numbered list order", "steps is okay but numbered list is clearer"),
    "over": ("ball flying over fence", "plane alone doesn't illustrate 'over/above'"),
    "safe": ("locked safe box", "helmet is 'safety' not 'safe'"),
    "swallow": ("swallowing water drink", "drinking alone might mean other things"),
    "voice": ("person speaking voice", "phone doesn't clearly show voice"),
    "weather": ("weather forecast sun rain", "windy is just one type of weather"),
    "nature": ("nature forest stream", "acorn is too specific for 'nature'"),
    "brilliant": ("bright shining diamond", "flashlight doesn't convey 'very smart/impressive'"),
    "because": ("cause and effect arrow", "sun hat doesn't illustrate 'because'"),
    "let down": ("sad disappointed face", "disappointed alone might not find good image"),
    "check out": ("examining closely", "looking is too generic"),
    "courageous": ("brave firefighter rescue", "lifeguard is okay but firefighter is stronger"),
    "complain": ("unhappy child complaining", "chores doesn't show complaining"),
    "ignore": ("turning away ignoring", "fly doesn't illustrate ignoring"),
    "role": ("actor costume stage", "narrator is too specific for 'role'"),
    "tend": ("tending garden plants", "garden alone doesn't show tending"),
    "range": ("mountain range panorama", "mountains is close but range is better"),
    "learn": ("student learning reading", "reading alone is too narrow for 'learn'"),
    "visit": ("visiting friends door", "dentist is too specific"),
    "distance": ("long road distance", "road alone doesn't show distance"),
    "famous": ("famous landmark", "statue is okay but landmark is broader"),
    "judge": ("judge gavel courtroom", "ribbon doesn't illustrate judging"),
    "hint": ("hint clue magnifying glass", "pointing alone is too vague"),
    "talent": ("talented performer stage", "drawing is too specific"),
    "minute": ("clock minute hand", "timer is okay but clock is more specific to minute"),
    "handful": ("handful of marbles", "popcorn is okay but marbles match definition better"),
    "main idea": ("key point highlight", "teamwork doesn't illustrate 'main idea'"),
    "score": ("scoreboard points game", "scoreboard alone is good - keep"),
}

def shorten_keyword(kw):
    """Shorten keywords > 4 words."""
    words = kw.strip().split()
    if len(words) <= 4:
        return kw
    
    # Remove annotation-style phrases
    cleaned = re.sub(r'\bwith arrow[s]?\s+pointing\s+to\b', '', kw, flags=re.IGNORECASE)
    cleaned = re.sub(r'\barrow\s+pointing\s+to\b', '', cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r'\bpointing\s+to\b', '', cleaned, flags=re.IGNORECASE)
    cleaned = ' '.join(cleaned.split())
    
    words = cleaned.split()
    if len(words) <= 4:
        return cleaned
    
    # Remove filler words and take first 4 meaningful
    stop = {'a','an','the','with','at','on','in','of','to','and','or','for','from','by','its','is','are'}
    meaningful = [w for w in words if w.lower() not in stop]
    if len(meaningful) > 4:
        meaningful = meaningful[:4]
    result = ' '.join(meaningful) if meaningful else ' '.join(words[:3])
    return result


def review_word(entry):
    word = entry["word"]
    defn = entry["definition"]
    kw = entry["imageKeyword"]
    result = {"word": word, "imageKeyword": kw, "changed": False}
    
    wl = word.lower().strip()
    kwl = kw.lower().strip()
    dl = defn.lower()
    
    # 1. Manual fixes
    if wl in MANUAL_FIXES:
        new_kw, reason = MANUAL_FIXES[wl]
        if kwl != new_kw.lower():
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = reason
            return result
    
    # 2. Shorten too-long keywords (>4 words)
    if len(kw.split()) > 4:
        shortened = shorten_keyword(kw)
        if shortened != kw:
            result["imageKeyword"] = shortened
            result["changed"] = True
            result["reason"] = "shortened for search effectiveness"
            return result
    
    # 3. Abstract words with bare keyword matching word
    abstract_markers = ['a feeling', 'a state of', 'the quality', 'the act of',
                       'the process', 'the ability', 'a belief', 'an idea',
                       'a concept', 'the condition', 'a way of', 'lack of']
    is_abstract = any(m in dl for m in abstract_markers)
    if kwl == wl and is_abstract:
        result["imageKeyword"] = word + " concept"
        result["changed"] = True
        result["reason"] = "abstract word needs more specific visual keyword"
        return result
    
    # 4. Disambiguation for homonyms (only if keyword = bare word)
    if kwl == wl:
        disambig = {
            ("sink", "go down"): "sinking ship",
            ("sink", "kitchen"): "kitchen sink",
            ("bat", "animal"): "bat animal flying",
            ("bat", "hit"): "baseball bat",
            ("bark", "tree"): "tree bark texture",
            ("bark", "dog"): "dog barking",
            ("crane", "bird"): "crane bird",
            ("crane", "machine"): "construction crane",
            ("trunk", "tree"): "tree trunk",
            ("trunk", "elephant"): "elephant trunk",
            ("current", "water"): "river current",
            ("current", "electric"): "electrical current",
            ("ring", "finger"): "finger ring jewelry",
            ("match", "fire"): "matchstick",
            ("match", "game"): "sports match",
            ("bolt", "lightning"): "lightning bolt",
            ("bolt", "metal"): "metal bolt nut",
            ("seal", "animal"): "seal animal",
            ("seal", "close"): "wax seal",
            ("pitcher", "pour"): "water pitcher",
            ("pitcher", "throw"): "baseball pitcher",
            ("pupil", "eye"): "eye pupil closeup",
            ("pupil", "student"): "school student",
            ("volume", "sound"): "volume knob speaker",
            ("volume", "space"): "measuring volume",
            ("cell", "living"): "biological cell",
            ("cell", "prison"): "prison cell",
            ("spring", "season"): "spring flowers",
            ("spring", "water"): "water spring",
            ("spring", "coil"): "metal spring coil",
            ("bank", "money"): "bank building",
            ("bank", "river"): "river bank",
            ("jam", "fruit"): "fruit jam jar",
            ("jam", "stuck"): "traffic jam",
            ("horn", "animal"): "animal horn",
            ("horn", "music"): "musical horn",
            ("nail", "finger"): "fingernail",
            ("nail", "metal"): "metal nail hammer",
            ("scale", "weigh"): "weighing scale",
            ("scale", "fish"): "fish scales",
            ("scale", "music"): "musical scale",
            ("mole", "animal"): "mole animal",
            ("mole", "skin"): "skin mole",
            ("port", "harbor"): "harbor port ships",
            ("port", "computer"): "computer port",
            ("bass", "fish"): "bass fish",
            ("bass", "music"): "bass guitar",
            ("flat", "apartment"): "apartment flat",
            ("flat", "level"): "flat surface",
            ("pound", "money"): "british pound coin",
            ("pound", "weight"): "pound weight",
            ("pound", "hit"): "pounding fist",
        }
        for (w, hint), new_kw in disambig.items():
            if wl == w and hint in dl:
                result["imageKeyword"] = new_kw
                result["changed"] = True
                result["reason"] = f"disambiguate {w} ({hint})"
                return result
    
    # 5. Generic single-word keywords
    if kwl in ('person', 'thing', 'place', 'people', 'object', 'stuff', 'item'):
        result["imageKeyword"] = word
        result["changed"] = True
        result["reason"] = "keyword too generic"
        return result
    
    return result


def main():
    all_results = []
    for i in range(1, 12):
        with open(f"image-review-batch-{i}.json") as f:
            batch = json.load(f)
        
        results = [review_word(w) for w in batch]
        
        with open(f"reviewer-C-batch-{i}.json", "w") as f:
            json.dump(results, f, indent=2)
        
        changed = sum(1 for r in results if r.get("changed"))
        print(f"Batch {i}: {len(results)} words, {changed} changed")
        all_results.extend(results)
    
    with open("reviewer-C-final.json", "w") as f:
        json.dump(all_results, f, indent=2)
    
    changed = sum(1 for r in all_results if r.get("changed"))
    print(f"\nTotal: {len(all_results)} words, {changed} changed")

main()
