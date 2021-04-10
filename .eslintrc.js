const prettierRule = {
  'prettier/prettier': [
    'error',
    {
      printWidth: 120,
      singleQuote: true,
      trailingComma: 'all',
    },
  ],
};

module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    ...prettierRule,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      extends: [
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
      ],
      plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks'],
      rules: {
        ...prettierRule,
        'no-underscore-dangle': ['error', { allow: ['__stylist'] }],
        'no-plusplus': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/react-in-jsx-scope': 'off',
      },
    },
  ],
};
