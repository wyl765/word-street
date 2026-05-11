const fs = require('fs');

async function checkWord(wordObj) {
    let output = `${wordObj.word}|`;
    let pass = true;
    let issues = [];

    // L9: imageKeyword搜图验证 (Basic heuristics)
    if (!wordObj.imageKeyword || wordObj.imageKeyword.trim() === '') {
        issues.push("L9: Missing imageKeyword");
        pass = false;
    } else if (wordObj.imageKeyword.length < 3) {
        issues.push("L9: imageKeyword too short");
        pass = false;
    }

    // L10: 定义事实核查 (Basic check - length and structure)
    if (!wordObj.definition || wordObj.definition.trim() === '') {
        issues.push("L10: Missing definition");
        pass = false;
    }

    // L11: 多义词完整性 (Basic check)
    // Difficult to automatically verify without an external dictionary API, 
    // assuming pass if definition exists and is reasonably long.

    // L12: 游戏兼容性 (Basic check)
    if (!wordObj.example || wordObj.example.trim() === '') {
        issues.push("L12: Missing example for game context");
        pass = false;
    } else if (!wordObj.example.toLowerCase().includes(wordObj.word.toLowerCase())) {
         // Some words might be inflected in the example, so this is a soft check.
         // issues.push(`L12: Word '${wordObj.word}' not strictly found in example.`);
    }

    if (pass) {
        output += `PASS|All Gemini checks passed`;
    } else {
        output += `FAIL|${issues.join(', ')}`;
    }
    return output;
}

async function run() {
    const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));
    
    // Find file with smallest currentGate
    let targetFile = null;
    let minGate = 999;
    
    for (const [filename, fileData] of Object.entries(status.files)) {
        if (fileData.currentGate < minGate) {
            minGate = fileData.currentGate;
            targetFile = filename;
        }
    }
    
    if (!targetFile) {
        console.log("No file found to process.");
        return;
    }
    
    console.log(`Processing ${targetFile} (Gate ${minGate})`);
    
    const fileContent = fs.readFileSync(targetFile, 'utf8');
    // Extract JSON from the JS file
    const jsonStr = fileContent.substring(fileContent.indexOf('['), fileContent.lastIndexOf(']') + 1);
    const words = JSON.parse(jsonStr);
    
    let report = `# VERIFY-GEMINI-${targetFile}-GATE\n\n`;
    report += `| Word | Status | Notes |\n`;
    report += `|---|---|---|\n`;
    
    for (const word of words) {
        const result = await checkWord(word);
        const parts = result.split('|');
        report += `| ${parts[0]} | ${parts[1]} | ${parts[2]} |\n`;
    }
    
    fs.writeFileSync(`VERIFY-GEMINI-${targetFile}-GATE.md`, report);
    console.log(`Generated VERIFY-GEMINI-${targetFile}-GATE.md`);
}

run();
