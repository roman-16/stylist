import searchParam from './searchParam';

let timeoutId;

const toggle = (state) => ({
  ...state,
  isOpen: !state.isOpen,
});

const sideMenu = {
  toggle,
  show: (state) => (!state.isOpen ? toggle(state) : state),
  hide: (state) => (state.isOpen ? toggle(state) : state),
};

const searchTerm = {
  set: (state, { value, batch, setParam = true }) => {
    clearTimeout(timeoutId);

    if (setParam) {
      const set = () => searchParam.set(value);

      batch ? (timeoutId = setTimeout(set, 500)) : set();
    }

    return {
      ...(state.isOpen ? state : sideMenu.show(state)),
      searchTerm: value,
    };
  },
  remove: (state, { setParam = true }) => {
    setParam && searchParam.remove();

    return {
      ...(state.isOpen ? sideMenu.hide(state) : state),
      searchTerm: undefined,
    };
  },
};

export { searchTerm, sideMenu };
