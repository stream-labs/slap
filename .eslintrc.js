module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-use-before-define': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'max-classes-per-file': 0,
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, { args: 'none' }],
    'arrow-body-style': 0,
    'space-before-function-paren': 0,
    'no-shadow': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'arrow-parens': 0,
    'react/jsx-one-expression-per-line': 0,
    'prefer-template': 0,
    'prefer-destructuring': 0,
    'class-methods-use-this': 0,
  },
};
