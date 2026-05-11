const fs = require('fs');

async function main() {
  const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));
  
  // Find file with smallest currentGate, but look for ones where gate9-12 are NOT 'pass'
  // Or just find the one that has the lowest gate that Gemini is supposed to process.
  // Wait, let's just find the file that Claude is working on (smallest currentGate)
  // The prompt says: "读 word-status.json，找到当前Claude正在审的文件（currentGate最小的）"
  
  let targetFile = null;
  let minGate = 999;
  
  for (const [file, info] of Object.entries(status.files)) {
    if (info.currentGate < minGate) {
      minGate = info.currentGate;
      targetFile = file;
    }
  }
  
  // Now if there are multiple with the same minGate, pick the first one that doesn't have gate9 pass.
  targetFile = null;
  for (const [file, info] of Object.entries(status.files)) {
    if (info.currentGate === minGate) {
      if (info.gate9 !== 'pass') {
        targetFile = file;
        break;
      }
    }
  }
  
  if (!targetFile) {
     // fallback
     for (const [file, info] of Object.entries(status.files)) {
        if (info.gate9 !== 'pass') {
            targetFile = file;
            break;
        }
     }
  }
  
  console.log(`Target file: ${targetFile}`);
}

main();
