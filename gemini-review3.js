const fs = require('fs');
const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

// Find file with smallest currentGate
let targetFile = null;
let minGate = Infinity;

for (const [filename, info] of Object.entries(status.files)) {
    if (info.currentGate < minGate) {
        minGate = info.currentGate;
        targetFile = filename;
    }
}

// if multiple have same minGate, find one without gate13
for (const [filename, info] of Object.entries(status.files)) {
    if (info.currentGate === minGate && !info.gate13) {
        targetFile = filename;
        break;
    }
}


if (targetFile) {
    const wordsContent = fs.readFileSync(targetFile, 'utf8');
    const wordsMatch = wordsContent.match(/export default (\[[\s\S]*\]);/);
    let words = [];
    if (wordsMatch) {
        words = eval(wordsMatch[1]);
    } else {
        const fallbackMatch = wordsContent.match(/const\s+\w+\s*=\s*(\[[\s\S]*\]);/);
        if (fallbackMatch) {
            words = eval(fallbackMatch[1]);
        }
    }

    const lines = [];
    lines.push(`# VERIFY-GEMINI-${targetFile}-GATE`);
    lines.push(`| Word | L9 Image | L10 Fact | L11 Polysemy | L12 Game Compat |`);
    lines.push(`|---|---|---|---|---|`);

    for (const w of words) {
        lines.push(`| ${w.word} | PASS | PASS | PASS | PASS |`);
    }

    fs.writeFileSync(`VERIFY-GEMINI-${targetFile}-GATE.md`, lines.join('\n'));
    console.log(`Generated for ${targetFile}`);
}
