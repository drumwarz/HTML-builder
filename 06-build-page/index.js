const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
  if (err) throw err;
});
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
  if (err) throw err;
});

fs.promises.readFile(path.join(__dirname, 'template.html'), function(err, items) {
  return items;
}).then(function(value) {
  let data = value.toString().split('\n');
  fs.readdir(path.join(__dirname, 'components'), function(err, items) {
    let input;
    let arr = [];
    for (let i = 0; i < items.length; i++) {
      input = fs.createReadStream(path.join(__dirname, 'components', items[i]), 'utf-8');
      input.on('data', data => arr.push(data));
    }
    input.on('end', () => {
      let html = data.map((x) => {
        for (let i = 0; i < items.length; i++) {
          if (path.parse(items[i]).name === x.replace(/[^a-zа-я0-9]+/g, '')) {
            return arr[i];
          }
        }
        return x;
      });
      let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
      output.write(html.join('\n'));
    })
  });
})

fs.readdir(path.join(__dirname, 'styles'), function(err, items) {
  let data = [];
  for (let i = items.length - 1; i >= 0; i--) {
    fs.stat(path.join(__dirname, 'styles', items[i]), function(err, stats) {
      if (stats.isFile() && path.parse(items[i]).ext === '.css') {
        let input = fs.createReadStream(path.join(__dirname, 'styles', items[i]), 'utf-8');
        input.on('data', chunk => data.push(chunk));
        input.on('end', () => {
          let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
          output.write(data.join('\n'));
        })
      }
    });
  }
});

fs.readdir(path.join(__dirname, 'assets'), function(err, items) {
  for (let i = 0; i < items.length; i++) {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', items[i]), { recursive: true }, err => {
      if (err) throw err;
      fs.readdir(path.join(__dirname, 'assets', items[i]), function(err, files) {
        for (let j = 0; j < files.length; j++) {
          fs.copyFile(path.join(__dirname, 'assets', items[i], files[j]), path.join(__dirname, 'project-dist', 'assets', items[i], files[j]), err => {
            if (err) throw err;
          });
        }
      });
    });
  }
})