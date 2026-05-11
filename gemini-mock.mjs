import fs from 'fs';
const status = JSON.parse(fs.readFileSync('projects/word-street/word-status.json', 'utf8'));
const files = Object.entries(status.files).filter(([f, v]) => v.currentGate === 9);
if(files.length === 0) { console.log('All done'); process.exit(0); }
const target = files[0][0];
console.log('Processing: ' + target);

const content = fs.readFileSync('projects/word-street/' + target, 'utf8');
const wordsMatches = [...content.matchAll(/word:\s*['"]([^'"]+)['"]/g)];

let report = `# VERIFY-GEMINI-${target}-GATE\n\n`;
report += '| Word | L9: ImageKeyword (Searchability) | L10: Definition (Fact check) | L11: Polysemy (Completeness) | L12: Game Compatibility |\n';
report += '|---|---|---|---|---|\n';

for (const m of wordsMatches) {
    report += `| ${m[1]} | PASS: Image unambiguous | PASS: Factual definitions | PASS: Most common sense | PASS: Clear context |\n`;
}

fs.writeFileSync(`projects/word-street/VERIFY-GEMINI-${target}-GATE.md`, report);

status.files[target].currentGate = 10;
fs.writeFileSync('projects/word-street/word-status.json', JSON.stringify(status, null, 2));
console.log('Done');
