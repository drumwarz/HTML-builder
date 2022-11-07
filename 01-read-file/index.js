
const path = require('path');
const fs = require('fs');

let readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readStream.on('data', chunk => console.log(chunk));