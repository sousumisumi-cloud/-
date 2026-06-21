const { readFileSync } = require('fs');

const requiredFiles = ['index.html', 'src/main.js', 'src/styles.css'];
for (const file of requiredFiles) {
  const content = readFileSync(file, 'utf8');
  if (!content.trim()) {
    throw new Error(`${file} is empty`);
  }
}

const html = readFileSync('index.html', 'utf8');
if (!html.includes('src/main.js') || !html.includes('src/styles.css')) {
  throw new Error('index.html must reference the app script and stylesheet');
}

console.log('Static HamTalk app files validated.');
