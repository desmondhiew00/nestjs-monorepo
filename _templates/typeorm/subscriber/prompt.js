// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//

const fs = require('fs');
const entities = fs.readdirSync('libs/database/src/entities/');

module.exports = [
  {
    type: 'input',
    name: 'NAME',
    message: 'Subscriber name?'
  },
  {
    type: 'select',
    name: 'ENTITY_FILE',
    choices: entities,
    message: 'Import entity from?'
  }
];
