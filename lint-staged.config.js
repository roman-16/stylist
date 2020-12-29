module.exports = {
  '**/*.{js,jsx,graphql}': [() => 'apollo client:download-schema', 'eslint --cache --fix --max-warnings 0'],
  '**/*.{js,jsx}': ['stylelint --cache'],
};
