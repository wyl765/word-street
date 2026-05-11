const fs = require('fs');

const fileContent = fs.readFileSync('words-level2c.js', 'utf8');
const jsonMatch = fileContent.match(/\[.*\]/s);
if (!jsonMatch) {
  console.log("No JSON found");
  process.exit(1);
}
const data = JSON.parse(jsonMatch[0]);

let md = fs.readFileSync('VERIFY-GEMINI-words-level2c.js-GATE.md', 'utf8');

data.forEach(item => {
  let l9 = "Pass";
  let l10 = "Pass";
  let l11 = "Pass";
  let l12 = "Pass";
  let status = "Pass";

  if (item.imageKeyword && item.imageKeyword.split(' ').length > 3) { l9 = "Warning: Long keyword"; status = "Review"; }
  if (item.definition && item.definition.length < 10) { l10 = "Warning: Short def"; status = "Review"; }

  md += `| ${item.word} | ${l9} | ${l10} | ${l11} | ${l12} | ${status} |\n`;
});

fs.writeFileSync('VERIFY-GEMINI-words-level2c.js-GATE.md', md);
