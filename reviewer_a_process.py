#!/usr/bin/env python3
"""
Reviewer A - Comprehensive imageKeyword quality review.
Reviews all 11 batches for a children's vocabulary app (ages 8-12).
"""

import json
import re

def review_keyword(entry):
    """Review a single entry. Returns dict with word, imageKeyword, changed, reason."""
    word = entry["word"]
    defn = entry["definition"]
    kw = entry["imageKeyword"]
    
    result = {"word": word, "imageKeyword": kw, "changed": False, "reason": ""}
    
    # Apply specific overrides first
    override = get_override(word, defn, kw)
    if override:
        result["imageKeyword"] = override[0]
        result["changed"] = True
        result["reason"] = override[1]
        return result
    
    kw_lower = kw.lower().strip()
    kw_words = kw.split()
    
    # Rule 1: Keywords with "arrow pointing" - these will return diagrams, not photos
    if "arrow pointing" in kw_lower or "arrow to" in kw_lower:
        new_kw = fix_arrow_keyword(word, defn, kw)
        if new_kw != kw:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Arrow keywords return diagrams, not photos"
            return result
    
    # Rule 2: Too long (>4 words) - shorten intelligently
    if len(kw_words) > 4:
        new_kw = shorten_keyword(word, defn, kw)
        if new_kw != kw:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Shortened to 2-4 words"
            return result
    
    # Rule 3: Generic concept keywords (ending in "concept", "idea", "symbol", "abstract")
    if kw_words[-1] in ("concept", "idea", "abstract") and len(kw_words) <= 3:
        new_kw = fix_concept_keyword(word, defn, kw)
        if new_kw != kw:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Abstract concept keyword won't return clear photo"
            return result
    
    # Rule 4: Thought bubbles and question marks (illustration, not photo)
    if "thought bubble" in kw_lower or "question marks" in kw_lower or "question mark" in kw_lower:
        new_kw = fix_illustration_keyword(word, defn, kw)
        if new_kw != kw:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Thought bubbles/question marks return illustrations, not photos"
            return result
    
    # Rule 5: Keywords that are too vague (single abstract word matching the word)
    if len(kw_words) == 1 and is_abstract(kw_lower, defn):
        new_kw = fix_abstract_single(word, defn, kw)
        if new_kw != kw:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Single abstract keyword - needs concrete visual"
            return result
    
    # Rule 6: Keywords with "symbol" (returns logos/icons)
    if "symbol" in kw_lower and word.lower() not in ("symbol",):
        new_kw = fix_symbol_keyword(word, defn, kw)
        if new_kw != kw:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Symbol keyword returns icons/logos, not photos"
            return result

    return result


def is_abstract(kw, defn):
    """Check if a keyword is abstract and unlikely to return good photos."""
    abstract_set = {
        "freedom", "justice", "wisdom", "courage", "patience", "kindness",
        "honesty", "loyalty", "respect", "peace", "truth", "love", "hope",
        "faith", "mercy", "grace", "virtue", "honor", "dignity", "equality",
        "liberty", "unity", "harmony", "chaos", "destiny", "fate", "fortune",
        "power", "strength", "beauty", "silence", "darkness", "loneliness",
        "friendship", "trust", "betrayal", "success", "failure", "victory",
        "defeat", "ambition", "determination", "perseverance", "resilience",
        "compassion", "empathy", "sympathy", "gratitude", "humility",
        "integrity", "morality", "ethics", "authority", "democracy",
        "prosperity", "poverty", "wealth", "knowledge", "ignorance",
        "wondering", "believing", "imagining", "remembering",
        "forgetting", "understanding", "considering",
        "agreeing", "disagreeing", "quietly", "loudly", "quickly",
        "slowly", "gently", "suddenly", "perhaps", "anyway",
        "besides", "throughout", "whether", "meanwhile",
        "often", "nowadays", "several",
        "against", "toward", "beyond", "during", "since",
        "whether", "entire", "certain", "terrible", "wonderful",
        "perfect", "strange", "enough", "none",
        "along", "around", "upon", "within", "without",
    }
    # Also check vague two-word combos
    if kw in abstract_set:
        return True
    # Check if it's a generic descriptor
    vague_pairs = {
        "silent quiet", "freezing cold", "scary dark", "scary monster",
        "quietly softly", "quickly fast", "frightened scared", "furious angry",
        "exhausted tired", "content happy", "generous sharing", "patient waiting",
        "grateful thankful", "beginning start", "suddenly surprise",
        "often frequently", "several few", "none empty", "entire complete",
        "quarter fourth", "strange odd", "along path", "around circle",
        "against wall", "breeze wind", "tugging pulling", "pushing hard",
        "tucking in", "soaking wet", "creating art", "vanishing magic",
        "gentle hands", "rough texture", "until waiting", "wondering thinking",
    }
    if kw.lower() in vague_pairs:
        return True
    return False


def fix_arrow_keyword(word, defn, kw):
    """Fix keywords that mention arrows (body parts mostly)."""
    body_map = {
        "elbow": "elbow joint closeup",
        "wrist": "wrist",
        "ankle": "ankle",
        "heel": "heel foot",
        "chin": "chin face",
        "forehead": "forehead",
        "shoulder": "shoulder",
        "hip": "hip bone anatomy",
        "spine": "human spine",
        "knee": "knee",
    }
    w = word.lower().strip()
    if w in body_map:
        return body_map[w]
    # Generic: strip arrow references
    return re.sub(r'\bwith arrow pointing to \w+\b', '', kw).strip() or kw


def shorten_keyword(word, defn, kw):
    """Shorten keyword to ≤4 words, keeping essential terms."""
    words = kw.split()
    # Remove common filler
    fillers = {"a", "an", "the", "of", "in", "on", "at", "to", "for", "with", "and", "or", "its"}
    essential = [w for w in words if w.lower() not in fillers]
    if len(essential) <= 4:
        return " ".join(essential)
    # Take most important words (usually nouns/adjectives at end)
    return " ".join(essential[:4])


def fix_concept_keyword(word, defn, kw):
    """Fix abstract concept keywords."""
    # Try to use a concrete visual instead
    return kw  # Will be caught by overrides


def fix_illustration_keyword(word, defn, kw):
    """Fix keywords that would return illustrations."""
    if "confused" in word.lower() or "mix up" in word.lower():
        return "confused child"
    if "imagine" in word.lower():
        return "child daydreaming"
    return kw


def fix_abstract_single(word, defn, kw):
    """Fix single abstract keywords."""
    return kw  # Handled by overrides mostly


def fix_symbol_keyword(word, defn, kw):
    """Fix symbol keywords."""
    return kw  # Case by case in overrides


def get_override(word, defn, kw):
    """Manual overrides for specific words. Returns (new_kw, reason) or None."""
    w = word.lower().strip()
    kw_lower = kw.lower().strip()
    
    overrides = {
        # === Additional fixes from comprehensive scan ===
        # Batch 2 vague single-word keywords
        "decide": ("choosing between options", "'choice' alone too vague"),
        "sum": ("addition math", "'addition' alone too vague"),
        "ask": ("child raising hand question", "'question' alone too vague"),
        "crumble": ("crumbling cookie", "'crumbs' alone too vague"),
        "glitter": ("glitter sparkles", "'sparkle' alone too vague"),
        "greet": ("greeting handshake", "'hello' alone too vague"),
        "matter": ("solid liquid gas", "'air' too narrow for definition"),
        
        # Cartoon/illustration keywords - should prefer photos
        "dwarf": ("garden gnome", "'fantasy dwarf cartoon' returns cartoons not photos"),
        "sword": ("medieval sword", "'cartoon medieval sword' returns cartoons"),
        "illustration": ("picture book page", "'book illustration' is fine"),
        "diagram": ("labeled diagram", "'diagram drawing' is fine"),
        "graphic": ("infographic poster", "'graphic diagram' too vague"),
        "caricature": ("caricature drawing", "'funny cartoon drawing' too vague"),
        "icon": ("app icon screen", "'computer icon' returns cartoons"),
        "animation": ("animation frames", "'cartoon frames' returns cartoons"),
        
        # Symbol keywords
        "slavery": ("slavery chains", "'freedom symbol broken chains icon' too long and returns icons"),
        "allegory": ("fable illustration", "'symbolic story' too abstract"),
        
        # Diagram keywords
        "carbon": ("charcoal carbon", "'carbon atom diagram' returns diagrams"),
        "artery": ("human artery", "'heart artery diagram' returns diagrams"),
        "water cycle": ("rain clouds evaporation", "'water cycle diagram' returns diagrams"),
        "circulate": ("blood circulation", "'circulation cycle diagram' returns diagrams"),
        "cell": ("microscope cell", "'animal cell diagram' returns diagrams"),
        "cortex": ("brain cortex", "'brain diagram' returns diagrams"),
        "anatomy": ("anatomy skeleton", "'body diagram' returns diagrams"),
        
        # Long keywords that need shortening (batch 2+)
        "average": ("medium sized cup", "Shortened"),
        "tale": ("storytelling grandpa", "Shortened"),
        "snuggle": ("child hugging teddy", "Shortened"),
        "rascal": ("mischievous puppy", "Shortened"),
        "gigantic": ("gigantic dinosaur", "Shortened"),
        "hear": ("child listening closely", "Shortened"),
        "lose": ("lost toy search", "Shortened"),
        "teach": ("teacher helping student", "Shortened"),
        "take": ("hand taking cookie", "Shortened"),
        "than": ("comparing two sizes", "Shortened"),
        "explain": ("explaining to child", "Shortened"),
        "separate": ("sorting blocks groups", "Shortened"),
        "setting": ("storybook castle scene", "Shortened"),
        "paragraph": ("paragraph text paper", "Shortened"),
        "attention": ("child listening carefully", "Shortened"),
        "awake": ("child awake bed", "Shortened"),
        "behavior": ("kids sharing nicely", "Shortened"),
        "bossy": ("bossy child pointing", "Shortened"),
        "center": ("bullseye center target", "Shortened"),
        "confuse": ("confused child doors", "Shortened"),
        "find": ("searching for book", "Shortened"),
        "downstairs": ("stairs going down", "Shortened"),
        "harm": ("caution sharp glass", "Shortened"),
        "kind": ("child offering seat", "Shortened"),
        "polite": ("child saying please", "Shortened"),
        "strong": ("strong rope pulling", "Shortened"),
        "trust": ("child holding parent hand", "Shortened"),
        "comfortable": ("child relaxing chair", "Shortened"),
        "uncomfortable": ("uncomfortable hard seat", "Shortened"),
        "bored": ("bored child ceiling", "Shortened"),
        "eager": ("eager dog waiting", "Shortened"),
        "homesick": ("homesick child window", "Shortened"),
        "foolish": ("walking in rain", "Shortened"),
        "instead": ("apple instead candy", "Shortened"),
        "anyway": ("smiling in rain", "Shortened"),
        "beside": ("friends sitting bench", "Shortened"),
        "between": ("cat between boxes", "Shortened"),
        "while": ("reading while waiting", "Shortened"),
        "hurry up": ("person running bus", "Shortened"),
        "late": ("person rushing late", "Shortened"),
        "once": ("holding up one", "Shortened"),
        "double": ("two identical cookies", "Shortened"),
        "few": ("few marbles jar", "Shortened"),
        "enough": ("glass filled top", "Shortened"),
        "equal": ("equal piles blocks", "Shortened"),
        
        # Long keywords from batches 3-11
        "quite": ("thinking hard puzzle", "Shortened"),
        "unless": ("conditions required", "Shortened"),
        "eventually": ("seed growing stages", "Shortened"),
        "regroup": ("regrouping math blocks", "Shortened"),
        "catch up": ("catching up running", "Shortened"),
        "pass out": ("handing out flyers", "Shortened"),
        "sign up": ("signing up sheet", "Shortened"),
        "take over": ("new leader taking charge", "Shortened but still descriptive"),
        "use up": ("empty container used", "Shortened"),
        "day by day": ("daily growth progress", "Shortened"),
        "in contrast": ("two different things", "Shortened"),
        "in general": ("most people usually", "Shortened but vague - use crowd"),
        "in particular": ("spotlight on one", "Shortened"),
        "on the whole": ("everything together", "Shortened"),
        "rather": ("child choosing jacket", "Shortened"),
        "declination": ("person declining offer", "Shortened"),
        "exacerbation": ("growing crack wall", "Shortened"),
        "facilitation": ("teacher guiding students", "Shortened"),
        "muzzle": ("dog snout closeup", "Shortened"),
        "accept": ("kids trading cards", "Shortened"),
        
        # Vague pair keywords from other batches
        "disappear": ("vanishing magician", "'vanishing magic' too vague"),
        "odd": ("odd sock pair", "'strange odd' too vague"),
        "hold your horses": ("horse reins stop", "'patient waiting' doesn't match idiom"),
        "exert": ("pushing heavy box", "'pushing hard' too vague"),
        "onset": ("storm clouds approaching", "'beginning start' too vague"),
        "journey": ("hiking trail journey", "'journey trip' too vague"),
        
        # Additional specific fixes
        "grab": ("hand grabbing apple", "Simplified"),
        "bend": ("bending to touch toes", "Shortened"),
        "twist": ("twisting jar lid", "Shortened"),
        "float": ("rubber duck floating", "Shortened"),
        "sink": ("sinking toy boat", "Matches definition of going under water"),
        "melt": ("melting ice cream", "Shortened"),
        "discover": ("child discovering frog", "Shortened"),
        "notice": ("noticing something ground", "Shortened"),
        "pretend": ("child pretending superhero", "Shortened"),
        "forget": ("forgotten keys table", "Shortened"),
        "belong": ("toy in labeled box", "Shortened"),
        "share": ("kids sharing pizza", "Shortened"),
        "borrow": ("borrowing book friend", "Shortened"),
        "attach": ("taping paper wall", "Shortened"),
        "sort": ("sorting colored blocks", "Shortened"),
        "huge": ("huge elephant", "Shortened"),
        "enormous": ("enormous whale", "Shortened"),
        "chilly": ("child shivering cold", "Shortened"),
        "loud": ("child covering ears", "Shortened"),
        
        # Fix repeat/loop arrows
        "repeat": ("replay button", "'loop arrows' returns diagrams"),
        
        # Fix in general
        "in general": ("crowd of people", "'most people usually' too vague"),
        
        # === Body parts with arrow diagrams ===
        "elbow": ("elbow joint", "Arrow keywords return diagrams"),
        "wrist": ("human wrist", "Arrow keywords return diagrams"),
        "ankle": ("human ankle", "Arrow keywords return diagrams"),
        "heel": ("heel of foot", "Arrow keywords return diagrams"),
        "chin": ("human chin", "Arrow keywords return diagrams"),
        "forehead": ("human forehead", "Arrow keywords return diagrams"),
        "shoulder": ("human shoulder", "Arrow keywords return diagrams"),
        "hip": ("human hip", "Arrow keywords return diagrams"),
        "spine": ("human spine model", "Arrow keywords return diagrams"),
        "skull": ("human skull", "Anatomy diagram keyword - use simple skull photo"),
        "rib": ("rib cage skeleton", "Use simple anatomy term"),
        "knee": ("human knee", "Arrow keywords return diagrams"),
        "pelvis": ("human pelvis bone", "Arrow keywords return diagrams"),
        "tendon": ("achilles tendon", "Arrow keywords return diagrams"),
        "abdomen": ("human abdomen", "Arrow keywords return diagrams"),
        "torso": ("human torso", "Anatomy diagram - simpler keyword"),
        
        # === Abstract concepts needing concrete visuals ===
        "freedom": ("bird flying open sky", "Abstract - needs concrete visual"),
        "justice": ("scales of justice", "Abstract - needs concrete visual"),
        "courage": ("brave firefighter", "Abstract - needs concrete visual"),
        "patience": ("child waiting in line", "Abstract - needs concrete visual"),
        "kindness": ("helping hand", "Abstract - needs concrete visual"),
        "honesty": ("honest face child", "Abstract - needs concrete visual"),
        "loyalty": ("loyal dog owner", "Abstract - needs concrete visual"),
        "wisdom": ("wise owl", "Abstract - needs concrete visual"),
        "peace": ("white dove olive branch", "Abstract - needs concrete visual"),
        "truth": ("honest expression", "Abstract - use concrete visual"),
        "harmony": ("choir singing together", "Abstract - needs concrete visual"),
        "unity": ("hands joined circle", "Abstract - needs concrete visual"),
        "dignity": ("person standing tall", "Abstract - needs concrete visual"),
        "equality": ("equal balance scale", "Abstract - needs concrete visual"),
        "liberty": ("statue of liberty", "Abstract - needs iconic visual"),
        "prosperity": ("abundant harvest", "Abstract - needs concrete visual"),
        "compassion": ("comforting hug", "Abstract - needs concrete visual"),
        "empathy": ("comforting friend", "Abstract - needs concrete visual"),
        "gratitude": ("thank you card", "Abstract - needs concrete visual"),
        "humility": ("humble bow", "Abstract - needs concrete visual"),
        "integrity": ("honest handshake", "Abstract - needs concrete visual"),
        "perseverance": ("marathon runner finish", "Abstract - needs concrete visual"),
        "resilience": ("tree growing through rock", "Abstract - needs concrete visual"),
        "ambition": ("mountain climber summit", "Abstract - needs concrete visual"),
        "determination": ("determined runner", "Abstract - needs concrete visual"),
        "betrayal": ("broken trust", "Abstract - needs concrete visual"),
        "morality": ("right wrong sign", "Abstract - needs concrete visual"),
        
        # === Too vague / won't return photos ===
        "silent": ("quiet library", "Vague keyword - use concrete scene"),
        "freezing": ("icicles frozen", "Vague - use concrete frozen image"),
        "soaking": ("soaking wet dog", "Vague - add concrete subject"),
        "patient": ("child waiting patiently", "'patient waiting' too vague"),
        "grateful": ("child receiving gift", "'grateful thankful' too vague"),
        "content": ("relaxed cat sleeping", "'content happy' too vague"),
        "exhausted": ("tired runner", "'exhausted tired' too vague"),
        "furious": ("angry face closeup", "'furious angry' too vague"),
        "frightened": ("scared child hiding", "'frightened scared' too vague"),
        "generous": ("sharing food", "'generous sharing' too vague"),
        "lonely": ("child alone park bench", "Shortened"),
        "beginning": ("starting line race", "'beginning start' too vague"),
        "suddenly": ("jack in the box", "'suddenly surprise' too vague"),
        "perhaps": ("coin flip", "'maybe perhaps' too vague"),
        "whether": ("choosing between options", "Keyword was too vague"),
        "often": ("daily routine calendar", "'often frequently' too vague"),
        "several": ("handful of marbles", "'several few' too vague"),
        "entire": ("whole pizza", "'entire complete' too vague"),
        "quarter": ("quarter coin", "'quarter fourth' too vague"),
        "strange": ("odd shaped fruit", "'strange odd' too vague"),
        "against": ("leaning against wall", "Add verb for searchability"),
        "along": ("walking along path", "'along path' needs verb"),
        "around": ("merry go round", "'around circle' too vague"),
        "breeze": ("wind blowing leaves", "'breeze wind' too vague"),
        "tug": ("tug of war", "'tugging pulling' too vague"),
        "shove": ("pushing cart", "'pushing hard' too vague"),
        "tuck": ("tucking child into bed", "'tucking in' too vague"),
        "wonder": ("child looking up stars", "'wondering thinking' too vague"),
        "create": ("child painting canvas", "'creating art' - be more specific"),
        "vanish": ("magician disappearing act", "'vanishing magic' too vague"),
        "gentle": ("gentle petting rabbit", "'gentle hands' too vague"),
        "rough": ("rough sandpaper texture", "'rough texture' - be specific"),
        "until": ("hourglass sand timer", "'until waiting' too vague"),
        "quickly": ("cheetah running fast", "'quickly fast' too vague"),
        "slowly": ("tortoise walking", "'slowly turtle' - use tortoise"),
        "quietly": ("finger on lips shush", "Good concrete keyword"),
        "gently": ("hand petting kitten", "Slight refinement"),
        "during": ("clock", "'clock showing time passing' - simplify"),
        "since": ("calendar dates marked", "'calendar with days marked' - simplify"),
        "meanwhile": ("split screen", "'two things happening at same time' won't return photo"),
        "before": ("first place starting line", "'before first' too vague"),
        "after": ("finish line runner", "'after next' too vague"),
        "forward": ("person walking forward", "'arrow pointing forward' returns diagram"),
        "next": ("next in line queue", "'arrow pointing to next door' returns diagram"),
        "then": ("numbered steps list", "'sequence arrows' returns diagram"),
        "moment": ("snapshot camera flash", "'snap of fingers' might not return photo"),
        "sudden": ("surprised face", "'lightning bolt surprise' confusing"),
        "recent": ("today newspaper", "Slight simplification"),
        "daily": ("sunrise daily", "'daily routine' might be vague"),
        "weekly": ("weekly planner", "'weekly calendar' is fine"),
        "nowadays": ("modern smartphone", "'nowadays modern' too vague"),
        "forever": ("stars night sky", "Shortened"),
        "apart": ("puzzle pieces separated", "'two puzzle pieces apart' too long"),
        "together": ("friends holding hands", "'friends holding hands circle' too long"),
        "backward": ("walking backward", "'person walking backward' too long"),
        "sideways": ("crab walking sideways", "'sideways crab' is okay"),
        "beneath": ("cat under bed", "'cat hiding beneath bed' too long"),
        "among": ("toy among many toys", "'toy in box full of toys' too long"),
        "within": ("coloring inside lines", "'coloring inside the lines' too long"),
        "throughout": ("flowers throughout garden", "'flowers in every part of garden' too long"),
        "upon": ("castle on hilltop", "'castle upon a hill' is okay but archaic kw"),
        
        # === Keywords unlikely to return good Wikimedia photos ===
        "look at": ("child looking at book", "'looking at' is too vague"),
        "come back": ("person returning home", "'coming back' too vague"),
        "sit down": ("child sitting chair", "'sitting down' too vague"),
        "stand up": ("person standing up", "'standing up' too vague"),
        "wake up": ("child waking up bed", "'waking up' too vague"),
        "give up": ("white surrender flag", "'giving up' too vague"),
        "find out": ("magnifying glass clue", "'finding out' too vague"),
        "turn off": ("light switch off", "'turning off' too vague"),
        "turn on": ("light switch on", "'turning on' too vague"),
        "fall down": ("child falling down", "'falling down' too vague"),
        "get up": ("person getting out bed", "'getting up' too vague"),
        "look out": ("lookout warning sign", "'look out warning' too vague"),
        "hold on": ("hands gripping rope", "'holding on' too vague"),
        "clean up": ("cleaning toys room", "'cleaning up' too vague"),
        "calm down": ("deep breath meditation", "'calming down' too vague"),
        "try on": ("trying on shoes store", "'trying on' too vague"),
        "throw away": ("throwing trash bin", "'throwing away' too vague"),
        "run out": ("empty milk carton", "'running out' too vague"),
        "come in": ("opening door entering", "'coming in' too vague"),
        "go away": ("person walking away", "'going away' too vague"),
        "show off": ("peacock displaying feathers", "'showing off' too vague"),
        "figure out": ("solving puzzle", "'figuring out' too vague"),
        "pick up": ("picking up ball", "'picking up' too vague"),
        "put down": ("putting book on table", "'putting down' too vague"),
        
        # === Potentially scary/inappropriate ===
        "terrified": ("scared child blanket", "Soften potentially scary imagery"),
        
        # === Thought bubbles / question marks ===
        "imagine": ("child daydreaming", "Thought bubbles return illustrations"),
        "confused": ("confused child", "Question marks return illustrations"),
        "mix up": ("confused child", "Question marks return illustrations"),
        
        # === "concept"/"idea"/"symbol" keywords ===
        "represent": ("flag representing country", "'represent symbol' too abstract"),
        "conceive": ("lightbulb moment", "'conceive idea' too abstract"),
        "theme": ("book theme illustration", "'big idea' too vague"),
        "propose": ("presenting proposal", "'suggesting idea' too vague"),
        "comprehend": ("child reading understanding", "'understanding concept' too abstract"),
        "premise": ("book opening page", "'basic idea' too vague"),
        "universal": ("earth globe", "'universal symbol' could return icons"),
        "paradox": ("impossible staircase", "'contradictory idea' too abstract"),
        "fatuous": ("silly clown", "'silly idea' too abstract"),
        "copyright": ("copyright sign", "'copyright symbol' is fine"),
        "innovative": ("invention prototype", "'bright idea' too vague"),
        "ludicrous": ("silly costume", "'silly idea' too abstract"),
        "preposterous": ("absurd hat", "'absurd idea' too abstract"),
        "trite": ("faded old poster", "'recycled idea' too abstract"),
        "eternal": ("ancient tree", "'forever symbol' too abstract"),
        "emblem": ("coat of arms", "'national symbol' could return flags - be specific"),
        "fallacy": ("optical illusion", "'wrong idea' too abstract"),
        
        # === Direction/arrow keywords ===
        "increase": ("thermometer rising", "'arrow going up' returns diagrams"),
        "direction": ("compass rose", "'arrow direction' returns diagrams"),
        "move on": ("person walking forward", "'arrow pointing forward' returns diagrams"),
        "indicate": ("pointing finger", "'arrow pointing' returns diagrams"),
        "inverse": ("mirror reflection", "'opposite arrows' returns diagrams"),
        "subsequent": ("queue line waiting", "'sequence arrows next' returns diagrams"),
        "ascendancy": ("mountain summit flag", "'rising arrow' returns diagrams"),
        
        # === Body part keywords that are okay ===
        # (most body parts with just the body part name are fine)
        
        # === Single gerund keywords that may be too vague ===
        "stir": ("stirring pot spoon", "'stirring' alone is vague"),
        "spill": ("spilled milk glass", "'spilling' alone is vague"),
        "splash": ("water splash", "'splashing' is okay"),
        "chop": ("chopping vegetables", "'chopping' alone is vague"),
        "sprinkle": ("sprinkling salt", "'sprinkling' alone is vague"),
        "scoop": ("ice cream scoop", "'scooping' alone is vague"),
        "hum": ("person humming music", "'humming' alone is vague"),
        "stare": ("child staring window", "'staring' alone is vague"),
        "sparkle": ("sparkling diamond", "'sparkling' is okay"),
        "dig": ("digging garden shovel", "'digging' alone is vague"),
        "knock": ("knocking on door", "'knocking' alone is vague"),
        "snore": ("person snoring sleeping", "'snoring' alone is vague"),
        "yawn": ("child yawning", "'yawning' is okay"),
        "laugh": ("children laughing", "'laughing' alone is vague"),
        "swallow": ("swallowing water", "Ambiguous - could be the bird"),
        "vote": ("voting ballot box", "'voting' alone is vague"),
        "breath": ("visible breath cold", "'breathing' alone is vague"),
        
        # Specific fixes for words where keyword doesn't match definition
        "bark": ("tree bark texture", "Matches 'outer covering of tree' definition"),
        "force": ("pushing heavy object", "'swing' doesn't match 'make something happen'"),
        "basic": ("simple plain design", "'kindness' doesn't match 'simple and important'"),
        "in fact": ("fact check stamp", "'truth' is too broad"),
        "talent": ("talented musician playing", "'drawing' is too narrow"),
        "attempt": ("child trying to juggle", "'juggling' doesn't convey 'trying'"),
        "better": ("comparison good better", "'handwriting' too narrow"),
        "camp": ("camping tent outdoors", "'camping' is fine"),
        "hint": ("magnifying glass clue", "'pointing' doesn't match 'small clue'"),
        "learn": ("student studying books", "'reading' is too narrow for 'learn'"),
        "always": ("sunrise every morning", "'handwashing' too narrow for 'always'"),
        "dizzy": ("spinning dizzy child", "'spinning' doesn't clearly show dizzy"),
    }
    
    if w in overrides:
        new_kw, reason = overrides[w]
        # Only return if actually different
        if new_kw.lower().strip() != kw_lower:
            return (new_kw, reason)
    
    return None


def process_batch(batch_num):
    """Process a single batch file."""
    filename = f"image-review-batch-{batch_num}.json"
    data = json.load(open(filename))
    
    results = []
    for entry in data:
        result = review_keyword(entry)
        results.append(result)
    
    return results


def main():
    all_results = []
    
    for batch_num in range(1, 12):
        results = process_batch(batch_num)
        
        # Save individual batch result
        outfile = f"reviewer-A-batch-{batch_num}.json"
        with open(outfile, 'w') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        changed_count = sum(1 for r in results if r["changed"])
        print(f"Batch {batch_num}: {len(results)} words, {changed_count} changed")
        
        all_results.extend(results)
    
    # Save combined final
    with open("reviewer-A-final.json", 'w') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    
    total_changed = sum(1 for r in all_results if r["changed"])
    print(f"\nTotal: {len(all_results)} words, {total_changed} changed")


if __name__ == "__main__":
    main()
