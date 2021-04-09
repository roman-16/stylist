import { compile, middleware, prefixer, serialize, stringify, MEDIA, RULESET } from 'stylis';
import { StylisConfig } from '@/types';

const createParseStylisString = ({ middlewares }: StylisConfig = {}) => (stylisString: string) =>
  serialize(
    compile(stylisString),
    middleware([
      (element) => {
        let string = '';

        if ([RULESET, MEDIA].includes(element.type) && element.root === null && element.children?.length) {
          string += `\n`;
        }

        return string;
      },
      ...(middlewares ?? []),
      prefixer,
      stringify,
    ]),
  )
    .split('\n')
    .slice(1);

export default createParseStylisString;
