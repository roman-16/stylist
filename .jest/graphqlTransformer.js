const loader = require('graphql-tag/loader');
const { transform } = require('@babel/core');

module.exports = {
  process: (src) => {
    const newSrc = loader.call({ cacheable: () => {} }, src);

    return transform(newSrc).code;
  },
};
