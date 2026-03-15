const fs = require('fs');
let content = fs.readFileSync('src/index.css', 'utf-8');

content = content.replace(/\(pointer: coarse\)/g, '(hover: none) and (pointer: coarse)');
fs.writeFileSync('src/index.css', content);

let jsContent = fs.readFileSync('src/components/HorizontalReel.jsx', 'utf-8');
jsContent = jsContent.replace(/\(pointer: coarse\)/g, '(hover: none) and (pointer: coarse)');
jsContent = jsContent.replace(/\(min-width: 768px\) and \(pointer: fine\)/g, '(min-width: 768px)');
fs.writeFileSync('src/components/HorizontalReel.jsx', jsContent);
