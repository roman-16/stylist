import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'react-use';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { addBaseAnalyticsProps, randomId, resolveTemplate } from '@helpers';
import { useContext, useMediaQuery, useTranslations } from '@shared/hooks';
import { Basic, Box, Flex, Form, Label, Swiper, Text } from '@shared/components';
import InfoButton from './InfoButton';
import Overlay from './Overlay';
import buildQueries from './buildQueries';

const StyledOverlay = styled(Overlay)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightBuyersguideGreen};

  ${(props) => props.theme.mediaQueries.medium} {
    position: absolute;
    background-color: white;
    height: auto;
  }
`;

const StyledLabel = styled(Label).attrs({
  font: 'h-s',
  color: 'anthrazit',
})`
  letter-spacing: normal;
`;

const StyledRadioButton = styled(Form.RadioButton)`
  margin-right: 10px;
  white-space: nowrap;
`;

const ResetButton = styled(Basic.Input).attrs({
  type: 'reset',
  font: 's',
  color: 'anthrazit',
})`
  align-self: center;
  font-weight: bold;
  text-decoration: underline;
  border: unset;
  background-color: unset;
  cursor: pointer;
`;

const RadioSwiper = ({ ...props }) => {
  const isMedium = useMediaQuery('medium');

  return (
    <Swiper
      scrollType="none"
      scrollbar={isMedium ? 'unset' : 'hidden'}
      mx={isMedium ? undefined : '-16px'}
      offsetBefore={isMedium ? undefined : '16px'}
      offsetAfter={isMedium ? undefined : '16px'}
      {...props}
    />
  );
};

export default React.forwardRef(({ detailMarkups, onChange, ...props }, ref) => {
  const { api } = useContext();
  const { current: forId } = useRef(randomId());
  const { translations } = useTranslations('snowboardFinder');
  const [overlayProps, setOverlayProps] = useState({
    isOpen: false,
    title: '',
    contentMarkup: '',
  });
  const queries = useRef();
  const { register, reset, watch } = useForm({
    mode: 'onBlur',
  });
  const fields = watch();

  useEffect(() => {
    const newQueries = buildQueries(fields);

    if (queries.current?.query === newQueries.query) return;

    queries.current = newQueries;

    onChange?.(queries.current);
  }, [fields, onChange]);

  useDebounce(
    () => {
      fields.bodyHeight &&
        api.bto.tracking.trackEvent?.('buyers-guides', 'form:snowboard:bodyHeight', fields.bodyHeight);
      fields.bodyWeight &&
        api.bto.tracking.trackEvent?.('buyers-guides', 'form:snowboard:bodyWeight', fields.bodyWeight);
    },
    1000,
    [fields],
  );

  const formAnalyticsProps = useMemo(
    () =>
      addBaseAnalyticsProps({
        category: 'buyers-guides',
      }),
    [],
  );

  return (
    <Box {...props}>
      <StyledOverlay {...overlayProps} setIsOpen={(isOpen) => setOverlayProps({ isOpen })} />
      <Form.Form ref={ref} display="flex" flexDirection="column" bg={{ _: 'white', medium: 'lightGrey' }} p="4">
        <StyledLabel mb="2">{translations.genderHeader}</StyledLabel>
        <RadioSwiper mb="5">
          <StyledRadioButton
            ref={register}
            name="gender"
            value="women"
            {...formAnalyticsProps}
            data-action="form:snowboard:gender"
            data-label="women"
            onClick={() => reset({ gender: 'women' })}
            // TODO: make reset work for radio buttons
            // onClick={() => {
            //   if (fields.gender === 'women') {
            //     reset({
            //       ...fields,
            //       gender: '',
            //     });
            //   }
            // }}
          >
            {translations.genderRadioWomen}
          </StyledRadioButton>
          <StyledRadioButton
            ref={register}
            name="gender"
            value="men"
            {...formAnalyticsProps}
            data-action="form:snowboard:gender"
            data-label="men"
            onClick={() => reset({ gender: 'men' })}
          >
            {translations.genderRadioMen}
          </StyledRadioButton>
          <StyledRadioButton
            ref={register}
            name="gender"
            value="kids"
            {...formAnalyticsProps}
            data-action="form:snowboard:gender"
            data-label="kids"
            onClick={() => reset({ gender: 'kids' })}
          >
            {translations.genderRadioKids}
          </StyledRadioButton>
        </RadioSwiper>

        <StyledLabel htmlFor={`${forId}-bodyHeight`} mb="2">
          {translations.bodyHeightHeader}
        </StyledLabel>
        <Form.Input
          id={`${forId}-bodyHeight`}
          ref={register}
          type="number"
          name="bodyHeight"
          placeholder="170"
          maxWidth="340px"
          mb="5"
        />

        <StyledLabel htmlFor={`${forId}-bodyWeight`} mb="2">
          {translations.bodyWeightHeader}
        </StyledLabel>
        <Form.Input
          id={`${forId}-bodyWeight`}
          ref={register}
          type="number"
          name="bodyWeight"
          placeholder="67"
          maxWidth="340px"
          mb="5"
        />

        {fields.gender === 'men' && (
          <>
            <Flex mb="2">
              <StyledLabel>{translations.snowboardBootsHeader}</StyledLabel>
              <InfoButton
                onClick={() =>
                  setOverlayProps({
                    isOpen: true,
                    title: translations.snowboardBootsHeader,
                    contentMarkup: detailMarkups?.snowboardBoots,
                  })
                }
              />
            </Flex>
            <Flex mb="5">
              <StyledRadioButton
                ref={register}
                name="snowboardBoots"
                value="yes"
                {...formAnalyticsProps}
                data-action="form:snowboard:snowboardBoots"
                data-label="yes"
              >
                {translations.yes}
              </StyledRadioButton>
              <StyledRadioButton
                ref={register}
                name="snowboardBoots"
                value="no"
                {...formAnalyticsProps}
                data-action="form:snowboard:snowboardBoots"
                data-label="no"
              >
                {translations.no}
              </StyledRadioButton>
            </Flex>
          </>
        )}

        <Flex mb="2">
          <StyledLabel>{translations.ridingLevelHeader}</StyledLabel>
          <InfoButton
            onClick={() =>
              setOverlayProps({
                isOpen: true,
                title: translations.ridingLevelHeader,
                contentMarkup: detailMarkups?.ridingLevel,
              })
            }
          />
        </Flex>
        <RadioSwiper mb="5">
          <StyledRadioButton
            ref={register}
            name="ridingLevel"
            value="beginner"
            {...formAnalyticsProps}
            data-action="form:snowboard:ridingLevel"
            data-label="beginner"
          >
            {translations.ridingLevelBeginner}
          </StyledRadioButton>
          <StyledRadioButton
            ref={register}
            name="ridingLevel"
            value="intermediate"
            {...formAnalyticsProps}
            data-action="form:snowboard:ridingLevel"
            data-label="intermediate"
          >
            {translations.ridingLevelIntermediate}
          </StyledRadioButton>
          <StyledRadioButton
            ref={register}
            name="ridingLevel"
            value="advanced"
            {...formAnalyticsProps}
            data-action="form:snowboard:ridingLevel"
            data-label="advanced"
          >
            {translations.ridingLevelAdvanced}
          </StyledRadioButton>
          <StyledRadioButton
            ref={register}
            name="ridingLevel"
            value="expert"
            {...formAnalyticsProps}
            data-action="form:snowboard:ridingLevel"
            data-label="expert"
          >
            {translations.ridingLevelExpert}
          </StyledRadioButton>
        </RadioSwiper>

        {fields.gender !== 'kids' && (
          <>
            <Flex mb="2">
              <StyledLabel>{translations.ridingStyleHeader}</StyledLabel>
              <InfoButton
                onClick={() =>
                  setOverlayProps({
                    isOpen: true,
                    title: translations.ridingStyleHeader,
                    contentMarkup: detailMarkups?.ridingStyle,
                  })
                }
              />
            </Flex>
            <RadioSwiper mb="5">
              <StyledRadioButton
                ref={register}
                name="ridingStyle"
                value="all-mountain"
                {...formAnalyticsProps}
                data-action="form:snowboard:ridingStyle"
                data-label="all-mountain"
              >
                {translations.ridingStyleAllMountain}
              </StyledRadioButton>
              <StyledRadioButton
                ref={register}
                name="ridingStyle"
                value="freeride"
                {...formAnalyticsProps}
                data-action="form:snowboard:ridingStyle"
                data-label="freeride"
              >
                {translations.ridingStyleFreeride}
              </StyledRadioButton>
              <StyledRadioButton
                ref={register}
                name="ridingStyle"
                value="freestyle"
                {...formAnalyticsProps}
                data-action="form:snowboard:ridingStyle"
                data-label="freestyle"
              >
                {translations.ridingStyleFreestyle}
              </StyledRadioButton>
              <StyledRadioButton
                ref={register}
                name="ridingStyle"
                value="jib"
                {...formAnalyticsProps}
                data-action="form:snowboard:ridingStyle"
                data-label="jib"
              >
                {translations.ridingStyleJib}
              </StyledRadioButton>
            </RadioSwiper>
          </>
        )}

        {!!queries.current?.minLength && (
          <Text mb="5" font="m" color="anthrazit">
            {resolveTemplate(translations.snowboardLengthInfo, {
              minLength: queries.current.minLength,
              maxLength: queries.current.maxLength,
            })}
          </Text>
        )}

        <ResetButton onClick={() => reset()} value={translations.resetButton} />
      </Form.Form>
    </Box>
  );
});
