// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'TABLE_NAME',
    message: 'Table name?'
  },
  {
    type: 'input',
    name: 'ENTITY_NAME',
    message: 'Entity name?'
  }
];
