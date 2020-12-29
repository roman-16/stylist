const createWrapper = (element) => ({
  detach: () => {
    element.parentNode.removeChild(element);
    element.remove();
  },
});

const attachDiv = (id = 'app') => {
  const element = document.createElement('div');
  element.id = id;

  document.body.append(element);

  return createWrapper(element);
};

attachDiv.onEach = (id = 'app') => {
  let div;

  beforeEach(() => {
    div = attachDiv(id);
  });

  afterEach(() => {
    div.detach();

    div = null;
  });

  return div;
};

export default attachDiv;
