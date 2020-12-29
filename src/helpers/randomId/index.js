let counter = 0;
const random = () => Math.floor(Math.random() * 1000000);
const randomId = () => `r-${counter++}-${random()}`;

randomId.number = () => random() * 1000 + counter++;

export default randomId;
