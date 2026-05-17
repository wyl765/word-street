#!/usr/bin/env python3
"""
Reviewer A - imageKeyword quality review for children's vocabulary app.
Processes all 11 batches and outputs reviewed results.
"""

import json
import sys
import os

# Keywords that are problematic patterns
GENERIC_KEYWORDS = {"person", "thing", "stuff", "object", "item", "people"}
ABSTRACT_NEEDS_CONCRETE = {
    # Common abstract words that need concrete visual metaphors
}

def review_word(entry):
    """Review a single word's imageKeyword. Returns reviewed entry."""
    word = entry["word"]
    definition = entry["definition"]
    keyword = entry["imageKeyword"]
    level = entry.get("level", 1)
    
    result = {
        "word": word,
        "imageKeyword": keyword,
        "changed": False,
        "reason": ""
    }
    
    # === Check for problematic patterns ===
    
    kw_lower = keyword.lower().strip()
    word_lower = word.lower().strip()
    
    # 1. Too generic
    if kw_lower in GENERIC_KEYWORDS:
        new_kw = suggest_better(word, definition, keyword)
        if new_kw != keyword:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = f"Too generic keyword '{keyword}'"
        return result
    
    # 2. Check if keyword is too long (>4 words generally)
    word_count = len(kw_lower.split())
    if word_count > 4:
        new_kw = shorten_keyword(word, definition, keyword)
        if new_kw != keyword:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = f"Keyword too long ({word_count} words), shortened"
        return result
    
    # 3. Check for potentially inappropriate/scary results
    scary_terms = ["dead", "death", "kill", "blood", "war ", "weapon", "gun", "knife attack",
                   "murder", "corpse", "violent", "gore", "horror", "scary monster",
                   "snake bite", "spider bite"]
    for term in scary_terms:
        if term in kw_lower:
            new_kw = suggest_safer(word, definition, keyword)
            if new_kw != keyword:
                result["imageKeyword"] = new_kw
                result["changed"] = True
                result["reason"] = f"Potentially inappropriate/scary imagery"
            return result
    
    # 4. Check for keywords that match word but word is abstract
    abstract_indicators = is_abstract_concept(word, definition, keyword)
    if abstract_indicators:
        new_kw = suggest_concrete(word, definition, keyword)
        if new_kw != keyword:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = abstract_indicators
        return result
    
    # 5. Check for keywords that won't return photos on Wikimedia
    if likely_poor_results(word, definition, keyword):
        new_kw = suggest_better(word, definition, keyword)
        if new_kw != keyword:
            result["imageKeyword"] = new_kw
            result["changed"] = True
            result["reason"] = "Keyword unlikely to return good photos on Wikimedia Commons"
        return result
    
    return result


def is_abstract_concept(word, definition, keyword):
    """Check if this is an abstract concept that needs a concrete visual."""
    abstract_words = {
        "freedom": "Abstract concept",
        "justice": "Abstract concept",
        "love": "Abstract concept",
        "hope": "Abstract concept",
        "faith": "Abstract concept",
        "truth": "Abstract concept",
        "wisdom": "Abstract concept",
        "courage": "Abstract concept",
        "patience": "Abstract concept",
        "kindness": "Abstract concept",
        "honesty": "Abstract concept",
        "loyalty": "Abstract concept",
        "respect": "Abstract concept",
        "peace": "Abstract concept",
        "anger": "Abstract emotion",
        "joy": "Abstract emotion",
        "fear": "Abstract emotion",
        "sadness": "Abstract emotion",
        "happiness": "Abstract emotion",
        "pride": "Abstract concept",
        "shame": "Abstract concept",
        "guilt": "Abstract concept",
        "envy": "Abstract concept",
        "greed": "Abstract concept",
    }
    
    kw_lower = keyword.lower().strip()
    word_lower = word.lower().strip()
    
    # If keyword is just the abstract word itself, it needs help
    if word_lower in abstract_words and kw_lower == word_lower:
        return abstract_words[word_lower]
    
    return None


def likely_poor_results(word, definition, keyword):
    """Check if keyword will likely return poor results on Wikimedia Commons."""
    kw_lower = keyword.lower()
    
    # Verb forms that won't match well
    if kw_lower.endswith("ing") and len(kw_lower.split()) == 1:
        # Single gerund keywords often don't work well on wikimedia
        # e.g. "running" alone might work, but "thinking" won't
        poor_gerunds = ["thinking", "wondering", "believing", "knowing", "feeling",
                        "wanting", "needing", "hoping", "wishing", "imagining",
                        "remembering", "forgetting", "understanding", "realizing",
                        "noticing", "considering", "assuming", "doubting",
                        "looking at", "agreeing", "disagreeing"]
        if kw_lower in poor_gerunds:
            return True
    
    # Keywords with "kids" or "children" doing abstract things
    if ("kids" in kw_lower or "children" in kw_lower) and any(
        abs_word in kw_lower for abs_word in ["thinking", "feeling", "imagining", "dreaming"]
    ):
        return True
    
    return False


def suggest_better(word, definition, keyword):
    """Suggest a better keyword based on the definition."""
    # This is the main review logic - mapping common problems to better keywords
    return keyword  # Default: keep as is


def suggest_safer(word, definition, keyword):
    """Suggest a safer keyword for potentially scary content."""
    return keyword


def suggest_concrete(word, definition, keyword):
    """Suggest a concrete visual for abstract concepts."""
    concrete_mappings = {
        "freedom": "bird flying in open sky",
        "justice": "scales of justice",
        "love": "heart shape",
        "hope": "sunrise over horizon",
        "faith": "candle flame",
        "truth": "open book",
        "wisdom": "owl on branch",
        "courage": "lion portrait",
        "patience": "child waiting in line",
        "kindness": "helping hand",
        "honesty": "pinky promise",
        "loyalty": "dog with owner",
        "respect": "handshake",
        "peace": "peace dove",
        "anger": "angry face expression",
        "joy": "child laughing",
        "fear": "wide eyed expression",
        "sadness": "crying child",
        "happiness": "smiling child",
        "pride": "trophy award",
        "shame": "child looking down",
        "guilt": "child looking guilty",
        "envy": "green eyed monster",
        "greed": "dragon gold hoard",
    }
    word_lower = word.lower().strip()
    if word_lower in concrete_mappings:
        return concrete_mappings[word_lower]
    return keyword


def shorten_keyword(word, definition, keyword):
    """Shorten a keyword to 2-4 words."""
    words = keyword.split()
    # Try removing common filler words
    fillers = {"a", "an", "the", "of", "in", "on", "at", "to", "for", "with", "and", "or"}
    essential = [w for w in words if w.lower() not in fillers]
    if 2 <= len(essential) <= 4:
        return " ".join(essential)
    # Just take first 4 meaningful words
    return " ".join(essential[:4]) if essential else " ".join(words[:4])


# This simple heuristic approach won't catch everything.
# Let me instead do a thorough manual-style review by examining each entry.
# I'll process in Python but apply more nuanced logic.

if __name__ == "__main__":
    print("This script contains helper functions. Use the batch processor instead.")
