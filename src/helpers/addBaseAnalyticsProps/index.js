import { mapKeys } from 'lodash-es';
import context from '@context';

export default ({ className, category, ...data }) => ({
  ...mapKeys(data, (value, key) => `data-${key}`),
  className: className ?? 'track-click',
  'data-category': category ?? context.pageType,
});
