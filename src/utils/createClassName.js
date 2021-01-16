let index = 0;

export default (prefix = 'st') => `${prefix}-${Math.round(Math.random() * 10000)}-${index++}`;
