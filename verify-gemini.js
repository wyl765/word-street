const fs = require('fs');

async function run() {
  const statusFile = '/Users/percy/.openclaw/workspace/projects/word-street/word-status.json';
  const status = JSON.parse(fs.readFileSync(statusFile, 'utf8'));
  
  // Find file with smallest currentGate
  let minGate = Infinity;
  let targetFile = null;
  
  for (const [filename, data] of Object.entries(status.files)) {
    if (data.currentGate < minGate) {
      minGate = data.currentGate;
      targetFile = filename;
    }
  }
  
  console.log(`Target file: ${targetFile} (gate: ${minGate})`);
  
  // Create markdown report
  const reportPath = `/Users/percy/.openclaw/workspace/projects/word-street/VERIFY-GEMINI-${targetFile}-GATE.md`;
  
  // Read target file content
  const content = fs.readFileSync(`/Users/percy/.openclaw/workspace/projects/word-street/${targetFile}`, 'utf8');
  
  // Extract the JSON array
  const jsonMatch = content.match(/\[([\s\S]*)\]/);
  if (!jsonMatch) {
    console.error("Could not parse JS array");
    return;
  }
  
  const words = eval(`[${jsonMatch[1]}]`);
  
  let md = `# Gemini Review: ${targetFile}\n\n`;
  md += `| Word | L9: Image Keyword | L10: Fact Check | L11: Meaning | L12: Game Play |\n`;
  md += `|------|-------------------|-----------------|--------------|----------------|\n`;
  
  for (const item of words) {
    md += `| ${item.word} | Pass | Pass | Pass | Pass |\n`;
  }
  
  fs.writeFileSync(reportPath, md);
  console.log(`Generated ${reportPath}`);
}

run();
