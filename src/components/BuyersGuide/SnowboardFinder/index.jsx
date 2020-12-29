import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { useTranslations } from '@shared/hooks';
import { A, Box, Product, Text } from '@shared/components';
import { hoverAnimation } from '@shared/animations';
import Form from './Form';
import ProductGridHeader from './ProductGridHeader';
import graphqlQuery from './query.graphql';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const fadeInAnimationDuration = 1000;

const Background = styled(Box).attrs({
  bg: 'lightBuyersguideGreen',
})`
  ${(props) => props.theme.mediaQueries.medium} {
    padding: 16px;
  }
`;

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas:
    'form'
    'header'
    'products';

  margin: auto;
  max-width: 1360px;

  ${(props) => props.theme.mediaQueries.medium} {
    grid-template-columns: 50% auto;
    grid-template-areas:
      '. header'
      'form products';
    gap: 16px;
  }

  /* 1025px - use case iPad */
  @media screen and (min-width: 1025px) {
    grid-template-columns: 36% auto;
  }
`;

const ProductGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 160px));
  grid-template-rows: auto;
  padding: 16px;
  gap: 16px;

  ${(props) =>
    props.showFadeInAnimation &&
    css`
      animation: ${fadeInAnimationDuration}ms ${fadeInAnimation} ease-out;
    `}

  ${(props) => props.theme.mediaQueries.medium} {
    grid-template-columns: repeat(auto-fit, minmax(160px, 220px));
    padding: 0;
  }

  ${(props) => props.theme.mediaQueries.large} {
    grid-template-columns: repeat(auto-fit, minmax(220px, 230px));
  }
`;

const StyledProduct = styled(Product)`
  background-color: white;

  ${(props) => props.theme.mediaQueries.medium} {
    background-color: unset;

    ${hoverAnimation}
  }
`;

const ShowAllSnowboards = styled(A).attrs({
  type: 'nav',
  font: { _: 'h-s', medium: 'h-m' },
  m: { _: '0 0 10px', medium: '32px 0' },
})`
  letter-spacing: normal;
  text-decoration: underline;
  text-align: center;
`;

export default ({ data: { detailMarkups } = {}, ...props }) => {
  const { translations } = useTranslations('snowboardFinder');
  const formRef = useRef();
  const [queries, setQueries] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showFadeInAnimation, setShowFadeInAnimation] = useState(true);
  const [loadProducts] = useLazyQuery(graphqlQuery, {
    onCompleted: (newData) => setData(newData),
  });

  useDebounce(
    () => {
      if (!queries) return;

      loadProducts({
        variables: {
          query: queries.query,
        },
      });
    },
    1000,
    [queries, loadProducts],
  );

  useEffect(() => {
    if (!data) return;

    setIsLoading(false);

    setShowFadeInAnimation(true);
    setTimeout(() => {
      setShowFadeInAnimation(false);
    }, fadeInAnimationDuration);

    window.uaEnhanced.trackImpressions(
      window.$('.c-bw-product-recommendations-cell-container--recos .track-load-producttile'),
    );
  }, [data]);

  return (
    <Background {...props}>
      <Grid>
        <ProductGridHeader gridArea="header" isLoading={isLoading} products={data?.products} scrollToRef={formRef} />

        <Box gridArea="form">
          <Form
            ref={formRef}
            detailMarkups={detailMarkups}
            onChange={(newQueries) => {
              setQueries(newQueries);
              setIsLoading(true);
            }}
            position={{ medium: 'sticky' }}
            top="0"
          />
        </Box>

        {data && (
          <Box gridArea="products">
            {data?.products.nodes.length > 0 ? (
              <>
                <ProductGrid showFadeInAnimation={showFadeInAnimation}>
                  {data.products.nodes.map((product) => {
                    const analyticsProps = {
                      'data-label': product.meta.code,
                      'data-category': 'buyers-guides',
                    };

                    return <StyledProduct key={product.id} product={product} {...analyticsProps} />;
                  })}
                </ProductGrid>
                {data?.products.totalCount > 30 && (
                  <ShowAllSnowboards
                    href={queries.href}
                    // FIXME: letterSpacing must be set here, it won't work otherwise
                    style={{ letterSpacing: 'normal' }}
                  >
                    {translations.showAllSnowboards}
                  </ShowAllSnowboards>
                )}
              </>
            ) : (
              <Text font="m" textAlign="center" p={{ _: '5', medium: '0' }}>
                {translations.noSnowboardsFound}
              </Text>
            )}
          </Box>
        )}
      </Grid>
    </Background>
  );
};
