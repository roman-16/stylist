import { compile, middleware, prefixer, serialize, stringify, MEDIA, RULESET } from 'stylis';

export default ({ middlewares = [] } = {}) => (stylisString) =>
  serialize(
    compile(stylisString),
    middleware([
      (element) => {
        let string = '';

        if ([RULESET, MEDIA].includes(element.type) && element.root === null && element.children.length) {
          string += `\n`;
        }

        return string;
      },
      ...middlewares,
      prefixer,
      stringify,
    ]),
  );
