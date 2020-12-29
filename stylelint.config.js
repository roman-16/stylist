module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-recommended', 'stylelint-config-styled-components', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'comment-whitespace-inside': 'always',
    'color-function-notation': 'modern',
  },
};
