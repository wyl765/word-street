const fs = require('fs');
const file = process.argv[2];
const gate = parseInt(process.argv[3], 10);
const status = JSON.parse(fs.readFileSync('word-status.json', 'utf8'));

if (status.files[file]) {
    status.files[file].currentGate = gate;
    status.files[file]['gate13'] = 'pass';
    status.files[file]['gate14'] = 'pass';
    fs.writeFileSync('word-status.json', JSON.stringify(status, null, 2));
    console.log(`Updated ${file} to gate ${gate}`);
}
