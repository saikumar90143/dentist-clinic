const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = [...walk('./components'), ...walk('./app')];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Replace ease: "easeOut" with ease: "easeOut" as const
  const newContent = content.replace(/ease:\s*"easeOut"/g, 'ease: "easeOut" as any');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Updated', file);
  }
});
