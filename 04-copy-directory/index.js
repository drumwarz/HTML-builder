const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files'), function(err, items) {
  for (let i = 0; i < items.length; i++) {
    fs.copyFile(path.join(__dirname, 'files', items[i]), path.join(__dirname, 'files-copy', items[i]), err => {
      if (err) throw err;
    });
  }
  const arr1 = items;
  fs.readdir(path.join(__dirname, 'files-copy'), function(err, items2) {
    const arr2 = items2;
    if (arr2.length > arr1.length) {
      const s = new Set(arr1);
      const deleteFile = arr2.filter(e => !s.has(e));
      for (let i = 0; i < deleteFile.length; i++) {
        fs.unlink(path.join(__dirname, 'files-copy', deleteFile[i]), err => {
          if (err) throw err;
        });
      }
    }
  });
});