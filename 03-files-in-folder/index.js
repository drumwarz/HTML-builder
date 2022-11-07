const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), function(err, items) {
  for (let i = 0; i < items.length; i++) {
    fs.stat(path.join(__dirname, 'secret-folder', items[i]), function(err, stats) {
      if (stats.isFile()) {
        console.log(`${path.parse(items[i]).name} - ${path.parse(items[i]).ext.slice(1)} - ${stats.size/1000}kb`);
      }
    });
  }
});