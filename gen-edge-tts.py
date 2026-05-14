#!/usr/bin/env python3
"""
Batch generate pronunciation audio for TTS-synthesized words using Edge Neural TTS.
Replaces macOS Samantha with en-US-AndrewNeural (high-quality male American voice).
"""
import asyncio
import json
import os
import sys
import time

VOICE = "en-US-AndrewNeural"
AUDIO_DIR = os.path.join(os.path.dirname(__file__), "audio")
INDEX_FILE = os.path.join(os.path.dirname(__file__), "audio-index.json")
BATCH_SIZE = 20  # concurrent requests
RATE = "-10%"  # slightly slower for clear pronunciation

async def generate_one(word, filename, semaphore):
    """Generate a single word's pronunciation."""
    import edge_tts
    outpath = os.path.join(AUDIO_DIR, filename)
    
    async with semaphore:
        try:
            communicate = edge_tts.Communicate(word, VOICE, rate=RATE)
            await communicate.save(outpath)
            size = os.path.getsize(outpath)
            if size < 500:
                print(f"  ⚠️ TINY: {word} -> {filename} ({size}B)")
                return word, False, "tiny file"
            return word, True, None
        except Exception as e:
            print(f"  ❌ FAIL: {word} -> {e}")
            return word, False, str(e)

async def main():
    with open(INDEX_FILE) as f:
        data = json.load(f)
    
    files = data.get("files", {})
    synth_words = []
    for word, info in files.items():
        src = info.get("source", "")
        if "macos" in src:
            synth_words.append((word, info["file"]))
    
    print(f"Total synth words to regenerate: {len(synth_words)}")
    
    semaphore = asyncio.Semaphore(BATCH_SIZE)
    
    success = 0
    failed = []
    start = time.time()
    
    # Process in chunks to show progress
    chunk_size = 50
    for i in range(0, len(synth_words), chunk_size):
        chunk = synth_words[i:i+chunk_size]
        tasks = [generate_one(w, f, semaphore) for w, f in chunk]
        results = await asyncio.gather(*tasks)
        
        for word, ok, err in results:
            if ok:
                success += 1
            else:
                failed.append((word, err))
        
        elapsed = time.time() - start
        print(f"  Progress: {min(i+chunk_size, len(synth_words))}/{len(synth_words)} "
              f"({success} ok, {len(failed)} failed) [{elapsed:.1f}s]")
    
    elapsed = time.time() - start
    print(f"\n=== DONE ===")
    print(f"Total: {len(synth_words)}")
    print(f"Success: {success}")
    print(f"Failed: {len(failed)}")
    print(f"Time: {elapsed:.1f}s")
    
    if failed:
        print(f"\nFailed words:")
        for w, e in failed:
            print(f"  {w}: {e}")
    
    # Update audio-index.json with new source
    for word, info in files.items():
        src = info.get("source", "")
        if "macos" in src:
            info["source"] = "edge-tts-andrew-neural"
    
    data["synthesized"] = len([w for w in files.values() if "edge-tts" in w.get("source", "")])
    data["humanRecordings"] = len(files) - data["synthesized"]
    data["ttsVoice"] = VOICE
    data["ttsEngine"] = "Microsoft Edge Neural TTS"
    data["regeneratedDate"] = time.strftime("%Y-%m-%d")
    
    with open(INDEX_FILE, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\naudio-index.json updated.")

if __name__ == "__main__":
    asyncio.run(main())
