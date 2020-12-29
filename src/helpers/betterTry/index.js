export default (func) => {
  let result;
  let error;

  try {
    result = func();
  } catch (_error) {
    error = _error;
  }

  if (result?.then) {
    return result.then((_result) => [_result]).catch((_error) => [undefined, _error]);
  }

  return [result, error];
};
