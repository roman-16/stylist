import React from 'react';
import styled, { css } from 'styled-components';
import { A, Image, Heading, Text, Span } from '@shared/components';

const contentPadding = css`
  padding: 0 15px;
`;

const TeaserImage = styled(Image)`
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
`;

const TeaserWrapper = styled(A).attrs({ type: 'nav', backgroundColor: 'lightNewBlue' })`
  transition: all 0.3s ease;
  padding-bottom: 10px;
  min-height: 310px;

  ${(props) => props.theme.mediaQueries.medium} {
    min-height: 270px;
  }

  /* add css grid column/row positioning values in case those are given (usually for desktop view) */
  ${({ startColumn, startRow }) =>
    startColumn &&
    startRow &&
    css`
      min-height: initial; /* reset min-height, height defintion from now on is done by css grid */
      grid-column: ${(props) => props.startColumn} / span 1;
      grid-row: ${(props) => props.startRow} / span 3;
    `}

  &:hover ${TeaserImage} {
    transform: scale(1.15); /* same scale as on blue world news lister pages */
  }
`;

const TeaserImageWrapper = styled.div`
  overflow: hidden;
  height: 170px;

  ${(props) => props.theme.mediaQueries.large} {
    height: initial;
  }
`;

const TeaserCategoryLabel = styled(Span).attrs({ color: 'newBlue', font: 'xs' })`
  ${contentPadding}

  padding-top: 5px;
  padding-bottom: 5px;
  text-decoration: underline;
  display: inline-block;
  margin: 0.5rem 0 0 0;
  font-weight: bold;

  ${(props) => props.theme.mediaQueries.large} {
    font-size: 15px;
    padding-bottom: initial;
  }
`;

const TeaserTitle = styled(Heading.H4).attrs({
  font: 'h-s',
  color: 'anthrazit',
})`
  ${contentPadding}
  letter-spacing: unset;

  ${(props) => props.theme.mediaQueries.large} {
    font-size: 20px;
  }
`;

const TeaserText = styled(Text).attrs({ color: 'anthrazit', font: 'xs' })`
  ${contentPadding}

  margin-top: .5rem;
  overflow: hidden;
  text-overflow: ellipsis;

  /*
   * Used to enable text-overflow: ellipsis on multiline
   * https://css-tricks.com/line-clampin/
   */
  /* stylelint-disable-next-line value-no-vendor-prefix */
  display: -webkit-box;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* number of lines to show */

  line-height: 1.7em; /* fallback */
  max-height: 3.4em; /* fallback */

  ${(props) => props.theme.mediaQueries.large} {
    margin-top: 1rem;
    font-size: 15px;
    -webkit-line-clamp: 3; /* number of lines to show */
    max-height: 5.1em; /* fallback */
  }
`;

export default ({
  gridStartValues = {},
  teaserData: { image, categories, title, summary, urlNice },
  mobile = false,
  currentWindowWidth,
  ...props
}) => {
  const imagePreset = currentWindowWidth < 400 ? '$mc1$' : '$c2$';

  return (
    <TeaserWrapper {...gridStartValues} {...props} href={urlNice}>
      <TeaserImageWrapper>
        <TeaserImage src={`${image}?${imagePreset}`} alt={title} aspectRatio={{ width: 16, height: 9 }} />
      </TeaserImageWrapper>
      <TeaserCategoryLabel mobile={mobile}>{categories[0].title}</TeaserCategoryLabel>
      <TeaserTitle>{title}</TeaserTitle>
      <TeaserText>{summary}</TeaserText>
    </TeaserWrapper>
  );
};
