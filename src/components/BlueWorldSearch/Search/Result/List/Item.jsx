/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import { removeLocalFromPath } from '@helpers';
import { A, Flex, Image, Skeleton, Span } from '@shared/components';
import addAnalyticsProps from '../../../shared/addAnalyticsProps';

const Wrapper = styled(A).attrs({
  type: 'nav',
  borderColor: 'middleGrey',
  py: '4',
})`
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 1px 0;
`;

const ImageWrapper = styled(Flex)`
  /* styling of child element so teamrider img is center positioned  */
  & > * {
    display: flex;
    justify-content: center;
  }
`;

const Category = styled(Span).attrs({
  font: 'h-s',
  color: 'newBlue',
})`
  font-size: 11px;
  line-height: normal;
  text-transform: uppercase;
`;

const Title = styled(Span).attrs({
  font: 'm',
  color: 'anthrazit',
})`
  font-weight: bold;

  /* https://css-tricks.com/almanac/properties/l/line-clamp/ */
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default ({ entry, loading, ...props }) => {
  const isTeamRider = !loading && entry.__typename === 'TeamRider';
  const newEntry = !loading && {
    ...entry,
    category: isTeamRider ? 'Team' : entry.categories[0].title,
    title: isTeamRider ? entry.name : entry.title,
  };

  return (
    <Wrapper
      {...props}
      href={newEntry.urlNice}
      {...(!loading &&
        addAnalyticsProps({
          action: 'click-search-result',
          label: removeLocalFromPath(newEntry.urlNice),
        }))}
    >
      <ImageWrapper justifyContent="center" minWidth="150px" height="90px">
        {loading ? (
          <Skeleton height="100%" width="100%" />
        ) : (
          <Image
            src={`${newEntry.image}?$tsh$&wid=${isTeamRider ? '90' : '150'}&hei=90&fit=crop`}
            srcSet={`${newEntry.image}?$tshx2$&wid=${isTeamRider ? '180' : '300'}&hei=180&fit=crop 2x`}
            alt={newEntry.title}
            borderRadius={isTeamRider && '100%'}
            aspectRatio={isTeamRider ? { width: 90, height: 90 } : { width: 150, height: 90 }}
          />
        )}
      </ImageWrapper>
      <Flex flexDirection="column" ml="4" width="100%">
        {loading ? (
          <>
            <Skeleton height="15px" width="50%" borderRadius="5" mb="2" />
            <Skeleton height="20px" width="100%" borderRadius="5" mb="2" />
            <Skeleton height="20px" width="75%" borderRadius="5" />
          </>
        ) : (
          <>
            <Category>{newEntry.category}</Category>
            <Title>{newEntry.title}</Title>
            {isTeamRider && <Image src={newEntry.nation.image} alt={newEntry.nation.name} width="4" />}
          </>
        )}
      </Flex>
    </Wrapper>
  );
};
