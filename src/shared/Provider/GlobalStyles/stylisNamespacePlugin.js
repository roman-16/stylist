const contextEnum = {
  selectorBlock: 2,
};

const typeEnum = {
  keyframe: 107,
};

export default (scope) => (context, content, selectors, parents, line, column, length, type) =>
  context === contextEnum.selectorBlock &&
  typeEnum.keyframe !== type &&
  selectors.forEach((selector, i) => {
    if (selector.startsWith(scope)) {
      // Don't apply the scope on selectors where it is already applied
      return;
    }

    selectors[i] = `${scope} ${selector}`;
  });
