const fs = require('fs');

const updateStatus = () => {
    const statusStr = fs.readFileSync('/Users/percy/.openclaw/workspace/projects/word-street/word-status.json', 'utf8');
    const status = JSON.parse(statusStr);
    
    status.files['words-level2b.js'].gate6 = 'pass';
    
    let pending = 0;
    let allClear = 0;
    for (const key in status.files) {
        if (status.files[key].gate6 === 'pending') {
            pending += status.files[key].totalWords;
        }
        if (status.files[key].gate6 === 'pass') {
            allClear += status.files[key].totalWords;
        }
    }
    
    status.summary.gate6_pending = pending;
    status.summary.allGatesClear = allClear;
    
    fs.writeFileSync('/Users/percy/.openclaw/workspace/projects/word-street/word-status.json', JSON.stringify(status, null, 2));
}

updateStatus();
