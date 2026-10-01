throw new Error('loi co y de test');
const fs = require('fs');
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist');
fs.copyFileSync('index.html', 'dist/index.html');
console.log('Build OK');