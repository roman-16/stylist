/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled, { css } from 'styled-components';
import { Button, Flex, Skeleton } from '@shared/components';
import { useTranslations } from '@shared/hooks';
import addAnalyticsProps from '../../shared/addAnalyticsProps';

const Tab = styled(Button).attrs({
  font: 'l',
  mr: '5',
  // pr because of cut text on ios devices
  pr: '2',
})`
  white-space: nowrap;

  ${(props) =>
    props.selected &&
    css`
      font-weight: bold;
      border-bottom: solid 3px ${({ theme }) => theme.colors.newBlue};
    `}
`;

export default ({ blueWorld, loading, selected, onSelectedChange, ...props }) => {
  const { translations } = useTranslations('blueWorldSearch');
  const tabs = [
    {
      name: translations.filter[0],
      type: 'All',
      length: blueWorld.length,
      label: 'all',
    },
    {
      name: translations.filter[1],
      type: 'BlueWorldStory',
      length: blueWorld.filter((entry) => entry.__typename === 'BlueWorldStory').length,
      label: 'stories',
    },
    {
      name: translations.filter[2],
      type: 'TeamRider',
      length: blueWorld.filter((entry) => entry.__typename === 'TeamRider').length,
      label: 'team',
    },
  ];

  return (
    <Flex {...props} font="l" overflowX="auto">
      {loading ? (
        <Skeleton height="30px" width="100%" borderRadius="5" />
      ) : (
        tabs.map((tab) => (
          <Tab
            key={tab.type}
            selected={selected === tab.type}
            onClick={() => onSelectedChange && onSelectedChange(tab.type)}
            {...addAnalyticsProps({
              action: 'click-search-tab',
              label: tab.label,
            })}
          >
            {`${tab.name} (${tab.length})`}
          </Tab>
        ))
      )}
    </Flex>
  );
};
