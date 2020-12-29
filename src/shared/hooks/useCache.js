import { useMemo } from 'react';
import cache from '@helpers/cache';

export default (key) => useMemo(() => cache(key), [key]);
