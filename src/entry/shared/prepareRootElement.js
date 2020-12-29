export default (selector, props) => {
  const referenceNode = document.querySelector(selector.selector);

  if (!referenceNode) {
    throw new Error('REFERENCE_NODE_NOT_FOUND');
  }

  let rootElement = document.createElement('div');
  rootElement = Object.assign(rootElement, props);

  if (selector.position === 'in') {
    referenceNode.appendChild(rootElement);
  } else if (selector.position === 'replace') {
    referenceNode.parentNode.replaceChild(rootElement, referenceNode);
  } else {
    referenceNode[selector.position](rootElement);
  }

  return rootElement;
};
