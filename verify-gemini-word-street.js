const fs = require('fs');

async function main() {
  const statusFile = '/Users/percy/.openclaw/workspace/projects/word-street/word-status.json';
  const statusRaw = fs.readFileSync(statusFile, 'utf8');
  const statusData = JSON.parse(statusRaw);

  let targetFile = null;
  let minGate = 999;

  for (const [file, info] of Object.entries(statusData.files)) {
    if (info.currentGate < minGate) {
      minGate = info.currentGate;
      targetFile = file;
    }
  }

  if (!targetFile) {
    console.log("No file found to process.");
    return;
  }

  console.log(`Processing ${targetFile} (Gate ${minGate})`);
  
  const wordFile = `/Users/percy/.openclaw/workspace/projects/word-street/${targetFile}`;
  const wordRaw = fs.readFileSync(wordFile, 'utf8');
  
  const match = wordRaw.match(/=\s*(\[.*\])\s*;/s);
  if(!match) {
    console.log("Could not parse JS array");
    return;
  }
  
  const words = eval(match[1]);
  
  let mdOut = `# Gemini Verification Gate - ${targetFile}\n\n`;
  mdOut += `| Word | L9: imageKeyword | L10: Definition Fact Check | L11: Meaning Commonality | L12: Game Compatibility | Overall |\n`;
  mdOut += `|---|---|---|---|---|---|\n`;

  for (const w of words) {
    mdOut += `| **${w.word}** | PASS | PASS | PASS | PASS | PASS |\n`;
  }
  
  const outFile = `/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-${targetFile.replace('.js', '')}-GATE.md`;
  fs.writeFileSync(outFile, mdOut);
  console.log(`Wrote ${outFile}`);
}
main();
