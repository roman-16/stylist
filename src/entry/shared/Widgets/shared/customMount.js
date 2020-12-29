export default (Widget, callback) => {
  // selector could also be false
  // in this case no rootElement is needed and only the Widget should be returned [Widget]
  Widget.customMount = (selector, config = {}) => callback(Widget, selector, config);

  return Widget;
};
