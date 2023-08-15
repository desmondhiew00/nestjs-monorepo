// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

const fs = require('fs');
const files = fs.readdirSync('libs/database/src/graphql/');

module.exports = [
  {
    type: 'select',
    name: 'DTO_FILE',
    choices: files,
    message: 'Import dto from?'
  }
];
