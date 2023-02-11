const path = require('path');
const programDir = path.join(__dirname, 'programs', 'blog');
const idlDir = path.join(__dirname, 'temp', 'idl');
const sdkDir = path.join(__dirname, 'app/blog-ui/src/ts/sdk', 'src');
const binaryInstallDir = path.join(__dirname, 'temp', '.crates');

module.exports = {
  idlGenerator: 'anchor',
  programName: 'blog',
  programId: 'F76mQ6wUu1sq4zkEuACCAWLD9E6EJd66BfokCzWDwHWo',
  idlDir,
  sdkDir,
  binaryInstallDir,
  programDir,
};
