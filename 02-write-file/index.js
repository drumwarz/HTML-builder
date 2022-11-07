const fs = require('fs');
const path = require('path');
const { stdin } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Введите текст:');
stdin.on('data', chunk => {
  const str = chunk.toString().trim();
  if (str === 'exit') {
    process.exit();
  } else {
    output.write(chunk);
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('До свидания!'));