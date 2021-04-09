import uniqueId from './uniqueId';

const createClassName = (prefix = 'st') => `${prefix}-${uniqueId()}`;

export default createClassName;
