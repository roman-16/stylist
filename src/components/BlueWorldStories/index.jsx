import React from 'react';
import { useWindowSize } from 'react-use';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { addBaseAnalyticsProps, removeLocalFromPath } from '@helpers';
import { useContext, useMediaQuery, useTranslations } from '@shared/hooks';
import { A, Heading, Container, Swiper } from '@shared/components';
import Teaser from './Teaser';
import query from './query.graphql';

// NOTE: Desktop switch bei win-width 1024px
const MainWrapper = styled.section`
  margin-top: 3rem;
  margin-bottom: 1rem;

  /* switch to grid container on large screens */
  ${(props) => props.theme.mediaQueries.large} {
    display: grid;
    justify-content: center;
    margin-bottom: 2rem;
    grid-template-columns: repeat(3, minmax(320px, 420px));
    column-gap: 20px;
    grid-template-rows: repeat(2, 20px 20px 20px 420px) 20px 20px;
    grid-template-areas:
      '. headline .'
      'firstTeaser headline thirdTeaser'
      'firstTeaser headline thirdTeaser';
  }
`;

const TitleWrapper = styled.div`
  grid-area: headline;
  margin-bottom: 10px;

  @media (min-width: 786px) {
    margin: initial;
  }
`;

const Title = styled(Heading.H3).attrs({ color: 'anthrazit', font: 'h-l' })`
  position: relative;
  top: -10px;
  text-align: center;
  letter-spacing: unset;
`;

const AllStoriesLink = styled(A).attrs({ color: 'newBlue', font: 'xs' })`
  display: block;
  margin-bottom: 2rem;
  text-decoration: underline;
  text-align: center;
  font-weight: bold;

  &:visited {
    color: #0099cc;
  }
  ${(props) => props.theme.mediaQueries.large} {
    font-size: 15px;
  }
`;

const StyledTeaser = styled(Teaser)`
  min-width: calc(80% - 20px);

  @media (min-width: 500px) {
    min-width: 60%;
  }

  @media (min-width: 600px) {
    min-width: 40%;
  }
`;

const TeaserSwiper = ({ width, ...props }) => {
  const space = width >= 600 ? '5%' : width >= 500 ? '7.5%' : '10px';

  return <Swiper {...props} offsetBefore={space} offsetAfter={space} spaceBetween={space} />;
};

export default ({ ...props }) => {
  const { translations } = useTranslations('blueWorldStories');
  const { width } = useWindowSize();
  const isLarge = useMediaQuery('large');

  const { language, country } = useContext();
  const { data, loading, error } = useQuery(query);

  if (loading || error) return null;

  return (
    <Container {...props} mx="0">
      <MainWrapper mobile={!isLarge}>
        <TitleWrapper>
          <Title>{translations.title}</Title>
        </TitleWrapper>
        {!isLarge ? (
          <TeaserSwiper width={width}>
            {data.blueWorldStories.map((story) => (
              <StyledTeaser
                mobile
                teaserData={story}
                key={story.image}
                currentWindowWidth={width}
                {...addBaseAnalyticsProps({
                  action: 'click-bw-widget',
                  label: removeLocalFromPath(story.urlNice),
                })}
              />
            ))}
          </TeaserSwiper>
        ) : (
          data.blueWorldStories.map((story, idx) => {
            // Upcoming a bunch of calculation for proper Teaser positioning with css grid container
            const verticalOffset = idx === 1 || idx === 4;
            const startRow =
              (verticalOffset && idx < 3 && 4) ||
              (!verticalOffset && idx < 3 && 2) ||
              (verticalOffset && idx < 6 && 8) ||
              6;
            const gridStartValues = {
              startColumn: (idx < 3 && idx + 1) || (idx < 6 && idx - 3 + 1),
              startRow,
            };

            return (
              <Teaser
                gridStartValues={gridStartValues}
                teaserData={story}
                key={story.image}
                {...addBaseAnalyticsProps({
                  action: 'click-bw-widget',
                  label: removeLocalFromPath(story.urlNice),
                })}
              />
            );
          })
        )}
      </MainWrapper>
      <AllStoriesLink href={`/${language}-${country}/blue-world/`}>{translations.allStories}</AllStoriesLink>
    </Container>
  );
};
