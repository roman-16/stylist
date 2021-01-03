const deepMerge = (object1, object2) => {
  if (!object2) return object1;

  return Object.entries(object2).reduce(
    (previous, [key, value]) => ({
      ...previous,
      [key]: typeof value === 'object' && previous[key] ? deepMerge(previous[key], value) : value,
    }),
    object1,
  );
};

export default deepMerge;
