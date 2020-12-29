import React from 'react';
import { Box, Skeleton, Span } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import Item from './Item';

export default ({ blueWorld, loading, ...props }) => {
  const { translations } = useTranslations('blueWorldSearch');

  return (
    <Box {...props}>
      {loading ? (
        <Skeleton height="17px" width="75%" borderRadius="5" mb="3" />
      ) : (
        <Span font="m" fontWeight="bold" color="anthrazit">{`${blueWorld.length} ${translations.results}${
          blueWorld.length > 0 ? ':' : ''
        }`}</Span>
      )}
      <Box>
        {loading
          ? Array.from('123456', (item) => <Item key={item} loading={loading} mb="-1px" />)
          : blueWorld.map((entry) => <Item key={entry.urlNice} entry={entry} mb="-1px" />)}
      </Box>
    </Box>
  );
};
