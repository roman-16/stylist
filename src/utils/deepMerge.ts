const deepMerge = (target: Record<string, any>, ...sources: {}[]): {} => {
  const parsedSources = sources.filter(Boolean);
  const source = parsedSources.shift();

  if (!source) return target;

  const mergedObject = Object.entries(source).reduce(
    (previous, [key, value]) => ({
      ...previous,
      [key]:
        typeof previous[key] === 'object' && typeof value === 'object' && value !== null
          ? deepMerge(previous[key], value)
          : value,
    }),
    target,
  );

  return deepMerge(mergedObject, ...parsedSources);
};

export default deepMerge;
