import json
import re

def process_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract words array
    match = re.search(r'const\s+words\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        match = re.search(r'module\.exports\s*=\s*(\[.*?\]);', content, re.DOTALL)
        if not match:
            # Maybe it's just JSON or we can find an array
            match = re.search(r'(\[\s*\{.*?\}\s*\])', content, re.DOTALL)
    
    if not match:
        print("Could not find words array in", filename)
        return

    words_str = match.group(1)
    
    # Simple fix for unquoted keys if necessary, or use eval/js2py
    # Since it's JS, we can use node to extract it to JSON
    pass

