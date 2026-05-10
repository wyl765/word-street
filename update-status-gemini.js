const fs = require('fs');

const statusPath = './word-status.json';
const status = JSON.parse(fs.readFileSync(statusPath, 'utf8'));

// Advance files from currentGate 1 to 2
for (const file in status.files) {
    if (status.files[file].currentGate === 1) {
        status.files[file].gate1 = 'pass';
        status.files[file].currentGate = 2;
    }
}

// Update summary
let gate1_pass = 0;
for (const file in status.files) {
    if (status.files[file].gate1 === 'pass') {
        gate1_pass += status.files[file].totalWords;
    }
}
status.summary.gate1_pass = gate1_pass;
status.lastUpdated = new Date().toISOString().split('T')[0];

fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
console.log('Updated word-status.json');
