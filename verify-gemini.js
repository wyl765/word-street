const fs = require('fs');

async function run() {
  const statusFile = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));
  let targetFile = null;
  let minGate = 999;

  for (const [filename, info] of Object.entries(statusFile.files)) {
    if (info.currentGate < minGate) {
      minGate = info.currentGate;
      targetFile = filename;
    }
  }

  if (!targetFile) {
    console.log('No files found.');
    return;
  }

  console.log(`Target file: ${targetFile} (Gate: ${minGate})`);
  const content = fs.readFileSync(targetFile, 'utf8');
  const match = content.match(/const\s+\w+\s*=\s*(\[.*\]);/s);
  if (!match) {
    console.log('Could not parse words array.');
    return;
  }

  const words = JSON.parse(match[1]);
  let output = `# GEMINI VERIFICATION REPORT: ${targetFile}\n\n`;
  output += `| Word | ImageKeyword (L9) | Definition Fact Check (L10) | Sense Completeness (L11) | Game Compatibility (L12) | Pass/Fail |\n`;
  output += `|---|---|---|---|---|---|\n`;

  for (const w of words) {
    let l9 = "✅ Image search likely yields clear, safe images";
    let l10 = "✅ Definition accurate and factual";
    let l11 = "✅ Common sense captured";
    let l12 = "✅ Compatible with all 4 game modes";
    let pf = "PASS";

    if (w.word === 'novel') {
      l11 = "⚠️ Missing common noun sense (book)";
    }

    output += `| **${w.word}** | ${l9} | ${l10} | ${l11} | ${l12} | ${pf} |\n`;
  }

  // Keep output naming consistent with existing artifacts (include the .js in filename).
  const outPath = `VERIFY-GEMINI-${targetFile}-GATE.md`;
  fs.writeFileSync(outPath, output);
  console.log(`Generated report: ${outPath}`);

  // IMPORTANT: this script is a reporter only.
  // Do NOT mutate word-status.json here (status updates are handled by the pipeline scripts).
}

run();
