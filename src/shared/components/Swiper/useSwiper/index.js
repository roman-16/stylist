import { useCallback, useRef, useState, useEffect } from 'react';
import { useGetSet, useDeepCompareEffect } from 'react-use';
import { last } from 'lodash-es';
import useChildrenObserver from './useChildrenObserver';

const scrollToChild = (child) =>
  child.scrollIntoView({
    // nearest to prevent vertical scrolling
    block: 'nearest',
  });

export default (config = {}) => {
  const [getRef, setRef] = useGetSet();
  const ref = getRef();

  const [justifyContent, setJustifyContent] = useState();
  const resizeObserver = useRef(
    new ResizeObserver(() => {
      if (!config.justifyContent) return;

      const newRef = getRef();

      if (!newRef) return;

      // Justify the content based on the config when scrolling isn't possible
      setJustifyContent(newRef.scrollWidth > newRef.clientWidth ? undefined : config.justifyContent);
    }),
  );
  useEffect(() => {
    if (!ref) return;

    resizeObserver.current.disconnect();
    resizeObserver.current.observe(ref);
  }, [ref]);

  const { onChildrenChange, getChildren } = useChildrenObserver(ref);

  const next = useCallback(
    (step = 1) => {
      const children = getChildren();
      const nextIndex = children.lastIntersectingChild.index + step;
      // Try to get the next child with step, if not defined, get the last one
      const nextChild = children.targets[nextIndex] ?? last(children.targets);

      scrollToChild(nextChild.target);
    },
    [getChildren],
  );
  const previous = useCallback(
    (step = 1) => {
      const children = getChildren();
      const previousIndex = children.firstIntersectingChild.index - step;
      // Try to get the next child with step, if not defined, get the last one
      const previousChild = children.targets[previousIndex] ?? children.targets[0];

      scrollToChild(previousChild.target);
    },
    [getChildren],
  );
  const [addNextArrow, setAddNextArrow] = useState(false);
  const [addPreviousArrow, setAddPreviousArrow] = useState(false);
  const children = getChildren();

  useDeepCompareEffect(() => {
    const addArrows =
      config.navigation !== undefined &&
      config.navigation.enabled !== false &&
      (config.navigation.start ?? 0) <= children.firstIntersectingChild.index;
    const hasNextChild = children.lastIntersectingChild.index < children.targets.length - 1;
    const hasPreviousChild = children.firstIntersectingChild.index > 0;

    setAddNextArrow(addArrows && hasNextChild);
    setAddPreviousArrow(addArrows && hasPreviousChild);
  }, [config, children]);

  return {
    swiperProps: {
      ref: setRef,
      onChildrenChange,
      onNextClick: useCallback(() => next(config.navigation?.step), [config.navigation?.step, next]),
      onPreviousClick: useCallback(() => previous(config.navigation?.step), [config.navigation?.step, previous]),
      css: { justifyContent },
      addNextArrow,
      addPreviousArrow,
    },
    next,
    previous,
  };
};
