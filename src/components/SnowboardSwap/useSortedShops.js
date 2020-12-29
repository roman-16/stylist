import { useMemo } from 'react';
import { groupBy, sortBy, values } from 'lodash-es';

export default (shops, countryField) =>
  useMemo(() => {
    if (!countryField) return [];

    const _sortedShops = sortBy(
      shops,
      (shop) => shop.isocode,
      (shop) => shop.city,
    );
    const shopsWithCountryFieldFirst = _sortedShops.reduce((prev, shop) => {
      if (shop.isocode === countryField.isocode) {
        // This is needed so that i won't reverse the sorting order
        const shopsWithThisIso = prev.filter((_shop) => _shop.isocode === countryField.isocode);

        return [...shopsWithThisIso, shop, ...prev.slice(shopsWithThisIso.length)];
      }

      return [...prev, shop];
    }, []);
    const groupedShopsObject = groupBy(shopsWithCountryFieldFirst, (shop) => shop.isocode);

    return values(groupedShopsObject);
  }, [shops, countryField]);
