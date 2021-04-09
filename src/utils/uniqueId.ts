let index = 0;

const uniqueId = () => Number(`${index++}${Math.round(Math.random() * 10000)}`);

export default uniqueId;
