const pangFs = require('pang-fs');
const path = require('path');
const testPath = require('../utils/testPath')
const testMkdir = require('../utils/testMkdir');
const ejs = require('ejs');
const { execSync } = require('child_process');

const run = async (type, name) => {
  testPath(name)
  const fileList = pangFs.readDir('./', 'list');
  const isMkdir = !fileList.every(testMkdir)
  if (isMkdir) {
    pangFs.mkdir(name);
  }
  const sourcePath = path.join(__dirname, `../template/${type}-template`);
  const targetPath = path.join(pangFs.getCurrPath(), isMkdir ? name : './')
  pangFs.copyDirOrFile(sourcePath, targetPath, (content, filePath, fileName) => {
    if (fileName === 'package.json') {
      const renderStr = ejs.render(content.toString(), {projectName: name})
      return renderStr
    }
    return content
  })
  execSync('npm install', {cwd: targetPath, stdio: 'inherit'})
}
module.exports = run;
