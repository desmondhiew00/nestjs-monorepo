const eslint = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');

const eslintConfigPrettier = require('eslint-config-prettier');

const { ESLint } = require('eslint');

/** @type {ESLint.ConfigData} */
const config = {
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    globals: {
      ...globals.node,
      ...globals.jest,
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
};

module.exports = [
  {
    ignores: ['**/eslint.config.js', '**/*.e2e-spec.ts', "test.js"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  config,
];
