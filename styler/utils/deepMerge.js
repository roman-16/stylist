const deepMerge = (target, ...sources) => {
  const parsedSources = sources.filter(Boolean);

  if (!parsedSources.length) return target;

  const source = parsedSources.shift();
  const mergedObject = Object.entries(source).reduce(
    (previous, [key, value]) => ({
      ...previous,
      [key]: typeof value === 'object' && previous[key] ? deepMerge(previous[key], value) : value,
    }),
    target,
  );

  return deepMerge(mergedObject, ...parsedSources);
};

export default deepMerge;
