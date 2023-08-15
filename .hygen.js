const { conforms } = require('lodash');
const _ = require('lodash');
const { plural, singular } = require('pluralize');
const path = require('path');
const changeCase = require('change-case');

module.exports = {
  helpers: {
    plural,
    singular,
    camelCase: _.camelCase,
    kebabCase: _.kebabCase,
    lowerCase: _.lowerCase,
    snakeCase: _.snakeCase,
    startCase: _.startCase,
    upperCase: _.upperCase,
    pascalCase: changeCase.pascalCase,
    removeExt: (filename) => path.parse(filename).name,
    dtoVar: (filename) => {
      const name = path.parse(filename).name.replace('dto', '');
      return changeCase.pascalCase(name) + 'DTO';
    },
    moduleName: (filename, suffix = '') => {
      const path = filename.split('.');
      const result = changeCase.pascalCase(path[0]);
      return result + suffix;
    },
    removeModuleExt: (filename) => {
      const paths = filename.split('.');
      return paths[0];
    },
    parseAuthorizerName: (name) => {
      name = name.replace('Authorizer', '');
      const result = `${changeCase.pascalCase(singular(name))}Authorizer`;
      return result;
    }
  }
};
