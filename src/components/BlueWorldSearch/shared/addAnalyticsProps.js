import { addBaseAnalyticsProps } from '@helpers';

export default (props) =>
  addBaseAnalyticsProps({
    category: 'blue-world',
    ...props,
  });
