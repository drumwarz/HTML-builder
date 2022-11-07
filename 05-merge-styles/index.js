const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), function(err, items) {
  let data = [];
  for (let i = items.length - 1; i >= 0; i--) {
    fs.stat(path.join(__dirname, 'styles', items[i]), function(err, stats) {
      if (stats.isFile() && path.parse(items[i]).ext === '.css') {
        let input = fs.createReadStream(path.join(__dirname, 'styles', items[i]), 'utf-8');
        input.on('data', chunk => data.push(chunk));
        input.on('end', () => {
          let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
          output.write(data.join('\n'));
        })
      }
    });
  }
});