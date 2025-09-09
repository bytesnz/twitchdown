const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 3,
      sourceType: 'script',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'no-multi-spaces': 'error',
      'no-unused-expressions': 'error',
      'no-shadow': 'error',
      'no-trailing-spaces': 'error',
      'no-console': ["error", { allow: ["warn", "error"] } ],
    }
  },
  {
    files: ['example.js', 'util/mkReadme.js'],
    languageOptions: {
      ecmaVersion: 6
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['tests/*.test.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'script'
    }
  }
];