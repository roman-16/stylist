import { useCallback, useRef } from 'react';
import { useGetSet } from 'react-use';
import { findLastIndex } from 'lodash-es';

const getChildrenMetaInfo = (children) => {
  const firstIntersectingChildIndex = children.findIndex((child) => child.isIntersecting);
  const lastIntersectingChildIndex = findLastIndex(children, (child) => child.isIntersecting);

  return {
    firstIntersectingChild: {
      target: children[firstIntersectingChildIndex],
      index: firstIntersectingChildIndex,
    },
    lastIntersectingChild: {
      target: children[lastIntersectingChildIndex],
      index: lastIntersectingChildIndex,
    },
  };
};

const initialChildren = {
  targets: [],
  firstIntersectingChild: { target: undefined, index: undefined },
  lastIntersectingChild: { target: undefined, index: undefined },
};

export default (swiperRef) => {
  const [getChildren, setChildren] = useGetSet(initialChildren);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const children = getChildren();

        // Initialize the children array if it is not defined
        if (children.targets.length <= 0) {
          const targets = entries.map((entry) => ({
            isIntersecting: entry.isIntersecting,
            target: entry.target,
          }));

          setChildren({
            targets,
            ...getChildrenMetaInfo(targets),
          });
        } else {
          entries.forEach((entry) => {
            // Update an entry in the array
            const index = children.targets.findIndex((child) => child.target === entry.target);

            if (index < 0) return;

            children.targets[index] = {
              isIntersecting: entry.isIntersecting,
              target: entry.target,
            };

            setChildren({
              targets: children.targets,
              ...getChildrenMetaInfo(children.targets),
            });
          });
        }
      },
      { threshold: 0.5 },
    ),
  );

  return {
    onChildrenChange: useCallback(() => {
      if (!swiperRef) return;

      observer.current.disconnect();
      setChildren(initialChildren);

      [...swiperRef.children].forEach((child) => observer.current.observe(child));
    }, [setChildren, swiperRef]),
    getChildren,
  };
};
