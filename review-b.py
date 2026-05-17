#!/usr/bin/env python3
"""Reviewer B: imageKeyword quality review for children's vocabulary app."""
import json
import sys
import os

BATCH_DIR = os.path.dirname(os.path.abspath(__file__))

# Keywords that are too abstract/vague and won't return good Wikimedia photos
# Also keywords that describe diagrams/arrows rather than photos
# Format: word -> (new_keyword, reason)

FIXES = {
    # Body parts with "arrow pointing to" - these describe diagrams, not photos
    "elbow": ("elbow joint", "arrow-style keywords return diagrams not photos"),
    "wrist": ("wrist bracelet", "arrow-style keywords return diagrams; bracelet on wrist is clear photo"),
    "ankle": ("ankle", "arrow-style keywords return diagrams; simple keyword better"),
    "heel": ("heel foot", "arrow-style keywords return diagrams"),
    "chin": ("chin face", "arrow-style keywords return diagrams"),
    "forehead": ("forehead", "arrow-style keywords return diagrams; simple keyword sufficient"),
    "shoulder": ("shoulder", "arrow-style keywords return diagrams"),
    "hip": ("hip", "arrow-style keywords return diagrams"),
    "spine": ("human spine", "arrow-style keywords return diagrams; 'back with arrow' too specific"),
    "skull": ("human skull", "'anatomy head bone diagram' explicitly asks for diagram not photo"),
    
    # Too abstract/vague - won't return clear photos
    "wonder": ("child looking up at stars", "'wondering thinking' too abstract for photo search"),
    "remind": ("sticky note reminder", "'reminder' too vague"),
    "forget": ("forgotten keys on table", "'person leaving keys on table' too long/specific for search"),
    "perhaps": ("question mark", "'maybe perhaps' too abstract"),
    "suddenly": ("surprised expression", "'suddenly surprise' too abstract"),
    "already": ("completed checklist", "'homework finished on desk' too specific"),
    "barely": ("fingertips reaching shelf", "'barely reaching' too vague"),
    "often": ("daily calendar routine", "'often frequently' too abstract"),
    "nowadays": ("modern smartphone", "'nowadays modern' too abstract"),
    "several": ("handful of marbles", "'several few' is contradictory and abstract"),
    "none": ("empty plate", "'none empty' too abstract"),
    "heap": ("heap of clothes", "'heap pile' redundant and vague"),
    "portion": ("food portion plate", "'portion serving' too vague"),
    "amount": ("pile of coins", None),  # actually OK
    "total": ("abacus", "'counting all fingers' too specific for search"),
    "entire": ("whole pizza uncut", "'entire complete' too abstract"),
    "content": ("child smiling relaxed", "'content happy' too vague for Wikimedia"),
    "before": ("sequence first step", "'before first' too abstract"),
    "after": ("sequence last step", "'after next' too abstract"),
    "then": ("numbered steps 1 2 3", "'sequence arrows first then next' too specific for search"),
    "beginning": ("starting line race", "'beginning start' too abstract"),
    "middle": ("center target", "'middle center' too abstract"),
    "during": ("hourglass", "'clock showing time passing' ok but hourglass more iconic"),
    "until": ("waiting room clock", "'until waiting' too abstract"),
    "since": ("calendar", "'calendar with days marked' is ok but simplify"),
    "whenever": ("rain puddle boots", "'frogs in rain puddles' doesn't illustrate 'whenever'"),
    "besides": ("fruit bowl variety", "'apples and grapes together' ok but simplify"),
    "within": ("kitten inside box", "'coloring inside the lines' too specific"),
    "without": ("empty glass", "'empty lunchbox' ok but simplify"),
    "throughout": ("flowers in garden", None),  # OK as-is
    "upon": ("castle on hill", "'castle upon a hill' - simplify keyword"),
    
    # Phrasal verbs - many are too vague
    "pick up": ("child picking up toy", "'picking up' too vague"),
    "put down": ("putting book on table", "'putting down' too vague"),
    "look at": ("child looking at butterfly", "'looking at' too vague"),
    "come back": ("child returning home", "'coming back' too vague"),
    "sit down": ("child sitting in chair", "'sitting down' too vague"),
    "stand up": ("child standing up", None),  # OK
    "wake up": ("child waking up stretching", "'waking up' could be clearer"),
    "give up": ("white flag surrender", "'giving up' too vague"),
    "find out": ("child with magnifying glass", "'finding out' too vague"),
    "turn off": ("hand flipping light switch off", "'turning off' too vague"),
    "turn on": ("hand flipping light switch on", "'turning on' too vague"),
    "fall down": ("child falling down", None),  # OK
    "get up": ("child getting out of bed", "'getting up' too vague"),
    "look out": ("child looking out window", "'look out warning' too vague"),
    "hold on": ("hands gripping rope", "'holding on' too vague"),
    "clean up": ("child cleaning room", "'cleaning up' too vague"),
    "calm down": ("child taking deep breath", "'calming down' too vague"),
    "try on": ("child trying on hat mirror", "'trying on' too vague"),
    "throw away": ("throwing trash in bin", "'throwing away' too vague"),
    "run out": ("empty milk carton", "'running out' too vague"),
    "come in": ("open door welcome", "'coming in' too vague"),
    "go away": ("person waving goodbye walking", "'going away' too vague"),
    "show off": ("child doing cartwheel", "'showing off' too vague"),
    "figure out": ("child solving puzzle", "'figuring out' too vague"),
    
    # Emotions - some too vague
    "frightened": ("scared child face", "'frightened scared' redundant"),
    "grateful": ("child saying thank you gift", "'grateful thankful' too abstract"),
    "furious": ("angry child face", "'furious angry' redundant"),
    "exhausted": ("tired child sleeping desk", "'exhausted tired' redundant"),
    "terrified": ("scared child hiding blanket", "'terrified child hiding blanket' is actually fine - keep similar"),
    
    # Adjectives - some too abstract
    "silent": ("finger on lips quiet", "'silent quiet' too vague"),
    "strange": ("unusual shaped cloud", "'strange odd' too abstract"),
    "certain": ("child raising hand confident", "'confident child pointing' ok but simplify"),
    "quickly": ("cheetah running", "'quickly fast' too abstract"),
    "slowly": ("tortoise walking", "'slowly turtle' - tortoise more specific"),
    "generous": ("child giving gift to friend", "'generous sharing' too abstract"),
    "patient": ("child waiting in line", "'patient waiting' too vague"),
    
    # Time words
    "moment": ("stopwatch", "'snap of fingers' hard to find on Wikimedia"),
    "recent": ("today newspaper", "'fresh newspaper today date' too long"),
    "daily": ("sunrise morning routine", "'daily routine' too vague"),
    "weekly": ("weekly planner", "'weekly calendar' ok but planner clearer"),
    
    # Quantity words
    "quarter": ("pie chart quarter", "'quarter fourth' too abstract"),
    "equal": ("balance scale equal", "'two equal piles of blocks' too specific"),
    "double": ("twin kittens", "'two identical cookies side by side' too long"),
    "single": ("single red rose", "'single flower in field' ok but rose more specific"),
    
    # Actions too vague for search
    "stare": ("child staring wide eyes", "'staring' too vague"),
    "glance": ("person glancing sideways", "'quick look' too vague"),
    "hum": ("child humming music", "'humming' too vague"),
    "tug": ("tug of war rope", "'tugging pulling' too vague"),
    "shove": ("children pushing sled", "'pushing hard' too vague"),
    "tuck": ("tucking child into bed", "'tucking in' too vague"),
    "hang": ("coat hanging on hook", "'hanging coat' ok but more specific"),
    "create": ("child painting canvas", "'creating art' too vague"),
    "design": ("child drawing with pencils", "'child drawing blueprint' ok"),
    "vanish": ("magic trick disappearing", "'vanishing magic' too vague"),
    
    # Prepositions/adverbs too abstract
    "forward": ("person walking forward arrow", "'arrow pointing forward' too abstract"),
    "backward": ("person walking backwards", None),  # OK
    "against": ("person leaning against wall", "'against wall' too vague"),
    "through": ("train through tunnel", "'through tunnel' - add train for better results"),
    "along": ("walking along path", "'along path' too vague"),
    "around": ("children dancing in circle", "'around circle' too abstract"),
    "beyond": ("landscape horizon", "'park behind trees' too specific"),
    
    # Food/drink
    "snack": ("apple cheese snack plate", "'snack' too generic"),
    "treat": ("ice cream cone", "'ice cream treat' ok but simplify"),
    "gravy": ("gravy boat", "'gravy' might return ambiguous results; gravy boat is iconic"),
    
    # Weather
    "breeze": ("wind blowing leaves", "'breeze wind' too vague"),
    "thunder": ("thunderstorm clouds", "'thunder' alone may return mixed results"),
    "freezing": ("frozen pond ice", "'freezing cold' too vague"),
    "boiling": ("boiling water pot", "'boiling water' ok but add pot"),
    "warm": ("warm sunlight", "'warm sun' too vague"),
    
    # Misc
    "plain": ("plain white t-shirt", None),  # OK
    "stale": ("stale bread", "'stale food' too vague"),
    "bitter": ("child tasting lemon bitter", "'bitter taste' too abstract"),
    "sour": ("child eating lemon sour face", "'sour face' could be clearer about cause"),
    "loose": ("child wiggling loose tooth", "'loose tooth' ok but add action"),
    "tight": ("tight jar lid", "'tight lid' ok"),
    "crooked": ("crooked fence", "'crooked leaning fence' ok but simplify"),
    "spare": ("spare tire", "'spare key' ok but spare tire more recognizable"),
    "ugly": ("ugly duckling swan story", "'ugly duckling' might not find good photos"),
    "clever": ("fox", "'clever fox' - fox alone is clearer for photo search"),
    "foolish": ("person without umbrella rain", "'person walking in rain no umbrella' too long"),
    "stubborn": ("stubborn donkey", "'stubborn mule' - donkey photos more common on Wikimedia"),
    "busy": ("busy bee flower", "'busy bee' add flower for better results"),
    "clumsy": ("puppy tripping", "'clumsy puppy tripping' ok but simplify"),
    "graceful": ("ballet dancer", "'graceful dancer' ok but ballet more specific"),

    # Emotions that need photo-friendly keywords  
    "peaceful": ("sleeping baby", "'peaceful sleeping baby' - simplify"),
    "gloomy": ("rainy window", "'gloomy rainy window child' too long"),
    "eager": ("excited dog door", "'excited dog waiting at door' too long"),
    "homesick": ("child looking out window", "'child looking out window sad' - remove 'sad' from search"),
    "ashamed": ("child hiding face", "'child hiding face ashamed' - remove abstract word"),
    
    # These describe overly specific scenes unlikely on Wikimedia
    "imagine": ("child daydreaming", "'child with thought bubble dragon' too specific/illustrated"),
    "pretend": ("child in cape playing", "'child pretending to be superhero cape' too long"),
    "discover": ("child magnifying glass", "'child finding frog under log' too specific"),
    "notice": ("binoculars", "'eye spotting something on ground' too specific"),
    "instead": ("child choosing apple", "'apple chosen instead of candy' too long"),
    "anyway": ("child playing in rain", "'girl walking in rain smiling' too long"),
    "whether": ("child looking at sky", "'child holding coat looking at sky' too long"),
    "while": ("child reading bus stop", "'child reading while waiting at bus stop' too long"),
    "among": ("one red ball many blue", "'toy in box full of toys' ok but simplify"),
}

def review_word(word_obj):
    """Review a single word's imageKeyword."""
    word = word_obj["word"]
    current = word_obj["imageKeyword"]
    
    if word in FIXES:
        new_kw, reason = FIXES[word]
        if reason is None:
            # Marked as OK
            return {"word": word, "imageKeyword": current, "changed": False}
        if new_kw != current:
            return {"word": word, "imageKeyword": new_kw, "changed": True, "reason": reason}
    
    # Auto-check for common issues
    issues = []
    
    # Too long keywords (more than 5 words)
    if len(current.split()) > 5:
        # Suggest shorter version
        shortened = " ".join(current.split()[:4])
        return {"word": word, "imageKeyword": shortened, "changed": True, 
                "reason": f"keyword too long for search; shortened from '{current}'"}
    
    # Keywords with "arrow pointing to" - diagram-like
    if "arrow pointing" in current.lower():
        simple = word
        return {"word": word, "imageKeyword": simple, "changed": True,
                "reason": "arrow-style keywords return diagrams not photos"}
    
    # Keywords that are just the abstract concept repeated
    abstract_pairs = [
        ("quickly fast", "cheetah running"),
        ("slowly turtle", "tortoise walking"),
    ]
    
    return {"word": word, "imageKeyword": current, "changed": False}


def process_batch(batch_num):
    """Process a single batch file."""
    input_path = os.path.join(BATCH_DIR, f"image-review-batch-{batch_num}.json")
    output_path = os.path.join(BATCH_DIR, f"reviewer-B-batch-{batch_num}.json")
    
    with open(input_path) as f:
        words = json.load(f)
    
    results = [review_word(w) for w in words]
    
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)
    
    changed = sum(1 for r in results if r["changed"])
    print(f"Batch {batch_num}: {len(results)} words, {changed} changed")
    return results


def main():
    all_results = []
    for i in range(1, 12):
        results = process_batch(i)
        all_results.extend(results)
    
    # Save combined final
    final_path = os.path.join(BATCH_DIR, "reviewer-B-final.json")
    with open(final_path, 'w') as f:
        json.dump(all_results, f, indent=2)
    
    changed = sum(1 for r in all_results if r["changed"])
    print(f"\nTotal: {len(all_results)} words, {changed} changed")
    print(f"Saved to {final_path}")


if __name__ == "__main__":
    main()
