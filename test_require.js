const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.startsWith('words-level') && f.endsWith('.js'));
console.log(files);
let total = 0;
files.forEach(f => {
  const mod = require('./' + f);
  const key = Object.keys(mod)[0];
  total += mod[key].length;
});
console.log("Total length:", total);
