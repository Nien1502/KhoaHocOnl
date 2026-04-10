const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyRecursive(sourcePath, destinationPath) {
  const stats = fs.statSync(sourcePath);

  if (stats.isDirectory()) {
    ensureDir(destinationPath);
    for (const entry of fs.readdirSync(sourcePath)) {
      copyRecursive(path.join(sourcePath, entry), path.join(destinationPath, entry));
    }
    return;
  }

  ensureDir(path.dirname(destinationPath));
  fs.copyFileSync(sourcePath, destinationPath);
}

const publicSrcDir = path.join(__dirname, 'public', 'src');
fs.rmSync(publicSrcDir, { recursive: true, force: true });
ensureDir(publicSrcDir);

copyRecursive(path.join(__dirname, 'src', 'assets'), path.join(publicSrcDir, 'assets'));
copyRecursive(path.join(__dirname, 'src', 'js'), path.join(publicSrcDir, 'js'));
