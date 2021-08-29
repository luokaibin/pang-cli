const testMkdir = (file) => {
  return ['.git', 'readme.md'].includes(file.toLowerCase())
}
module.exports = testMkdir