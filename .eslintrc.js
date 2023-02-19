module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsdoc', 'prettier'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'warn',
    'jsdoc/tag-lines': 0,
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        printWidth: 120,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
