import { compile, middleware, prefixer, serialize, stringify } from 'stylis';

export default ({ middlewares = [] } = {}) => (stylisString) =>
  serialize(compile(stylisString), middleware([...middlewares, prefixer, stringify]));
