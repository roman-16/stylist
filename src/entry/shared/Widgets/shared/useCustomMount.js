import { useAsync } from 'react-use';

export default (Widget, config) => {
  const { loading, error, value: LoadedWidget } = useAsync(async () => (await Widget.customMount(false, config))[0]);

  if (loading) {
    return () => 'Loading ...';
  }

  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return () => 'Error, something happend!';
  }

  return LoadedWidget;
};
