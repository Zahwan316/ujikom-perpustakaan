const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src'); // ganti sesuai dengan folder sumber kode Anda

function replaceInFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(/'@mui\/material\/';/g, "'./node_modules/@mui/material/';");

    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) return console.log(err);
    });
  });
}

function traverseDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          return console.log(err);
        }
        if (stats.isDirectory()) {
          traverseDirectory(fullPath);
        } else if (stats.isFile() && fullPath.endsWith('.js')) { // ganti sesuai ekstensi file Anda, bisa juga .jsx, .ts, .tsx
          replaceInFile(fullPath);
        }
      });
    });
  });
}

traverseDirectory(directoryPath);
