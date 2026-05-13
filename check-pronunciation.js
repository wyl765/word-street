const fs = require('fs');
const path = require('path');
const https = require('https');

const DIR = __dirname;
const WORDS_FILE = path.join(DIR, 'all-words.txt');
const RESULT_FILE = path.join(DIR, 'pronunciation-check.json');
const LEVEL_MAP_FILE = path.join(DIR, 'word-level-map.json');

const RATE_LIMIT_MS = 500; // ~2 req/s to avoid rate limiting
const MAX_RETRIES = 3;

const words = fs.readFileSync(WORDS_FILE, 'utf8').trim().split('\n');
const levelMap = JSON.parse(fs.readFileSync(LEVEL_MAP_FILE, 'utf8'));

// Load existing results for resume
let result = { total: words.length, hasAudio: 0, missingAudio: 0, coverage: '0%', words: {}, missing: [] };
if (fs.existsSync(RESULT_FILE)) {
  try { result = JSON.parse(fs.readFileSync(RESULT_FILE, 'utf8')); } catch(e) {}
}

function fetch(word) {
  return new Promise((resolve, reject) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            let audioUrl = null;
            for (const entry of json) {
              if (entry.phonetics) {
                for (const p of entry.phonetics) {
                  if (p.audio && p.audio.trim() !== '') { audioUrl = p.audio; break; }
                }
              }
              if (audioUrl) break;
            }
            resolve({ hasAudio: !!audioUrl, audioUrl });
          } catch(e) { resolve({ hasAudio: false, audioUrl: null }); }
        } else if (res.statusCode === 404) {
          resolve({ hasAudio: false, audioUrl: null, notFound: true });
        } else if (res.statusCode === 429) {
          reject(new Error('RATE_LIMITED'));
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const toCheck = words.filter(w => !(w in result.words));
  console.log(`Total: ${words.length}, Already checked: ${words.length - toCheck.length}, Remaining: ${toCheck.length}`);
  
  let checked = words.length - toCheck.length;
  
  for (let i = 0; i < toCheck.length; i++) {
    const word = toCheck[i];
    let success = false;
    
    for (let retry = 0; retry < MAX_RETRIES; retry++) {
      try {
        const r = await fetch(word);
        result.words[word] = { hasAudio: r.hasAudio, audioUrl: r.audioUrl || null };
        if (r.notFound) result.words[word].notFound = true;
        success = true;
        break;
      } catch(e) {
        if (e.message === 'RATE_LIMITED') {
          console.log(`Rate limited at ${word}, waiting 5s...`);
          await sleep(5000);
        } else {
          console.log(`Error for "${word}" (attempt ${retry+1}): ${e.message}`);
          await sleep(1000);
        }
      }
    }
    
    if (!success) {
      result.words[word] = { hasAudio: false, audioUrl: null, error: true };
    }
    
    checked++;
    if (checked % 100 === 0 || i === toCheck.length - 1) {
      // Recalculate stats
      result.hasAudio = 0;
      result.missingAudio = 0;
      result.missing = [];
      for (const w of words) {
        if (result.words[w]) {
          if (result.words[w].hasAudio) result.hasAudio++;
          else { result.missingAudio++; result.missing.push(w); }
        }
      }
      result.coverage = ((result.hasAudio / result.total) * 100).toFixed(1) + '%';
      
      fs.writeFileSync(RESULT_FILE, JSON.stringify(result, null, 2));
      console.log(`Progress: ${checked}/${words.length} (${((checked/words.length)*100).toFixed(1)}%) | Audio: ${result.hasAudio} | Missing: ${result.missingAudio}`);
    }
    
    await sleep(RATE_LIMIT_MS);
  }
  
  console.log('\n=== DONE ===');
  console.log(`Total: ${result.total}`);
  console.log(`Has Audio: ${result.hasAudio}`);
  console.log(`Missing Audio: ${result.missingAudio}`);
  console.log(`Coverage: ${result.coverage}`);
}

main().catch(e => { console.error(e); process.exit(1); });
