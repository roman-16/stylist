import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useContext, useReCaptcha, useTranslations } from '@shared/hooks';
import { Flex, Form, Text } from '@shared/components';
import { baseURL } from '@helpers';
import GenderField from './GenderField';
import TextField from './TextField';
import CountryDropdown from './CountryDropdown';
import DonateCheckbox from './DonateCheckbox';
import ReturnMethod from './ReturnMethod';
import ChooseShop from './ChooseShop';
import SubmitButton from './SubmitButton';
import useSortedShops from './useSortedShops';
import mutation from './mutation.graphql';

const SectionHeading = styled(Text).attrs({ font: 'l' })`
  margin-bottom: 8px;
  font-weight: bold;

  ${(props) => props.theme.mediaQueries.small} {
    margin-bottom: 16px;
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

export default ({ data, ...props }) => {
  const { country: userCountry, device, omniCountries } = useContext();
  const { translations } = useTranslations('snowboardSwap');
  const {
    control,
    errors,
    formState: { isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm();
  const { country: countryField, returnMethod: returnMethodField } = watch(['country', 'returnMethod']);
  const sortedShops = useSortedShops(data.shops, countryField);
  const [addSnowboardSwapEntry] = useMutation(mutation);
  const [executeReCaptcha, ReCaptcha] = useReCaptcha();

  useEffect(() => {
    setValue('returnMethod', omniCountries.includes(countryField?.isocode) ? 'shop' : 'shipping');
  }, [setValue, omniCountries, countryField]);

  const onSubmit = async (values) => {
    const token = await executeReCaptcha();

    await addSnowboardSwapEntry({
      variables: {
        input: {
          gender: values.gender.toUpperCase(),
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          addressAddition: values.addressAddition,
          postcode: values.postcode,
          city: values.city,
          country: values.country.isocode,
          boardInfo: values.boardInfo,
          boardCondition: values.boardCondition,
          donate: values.donate,
          returnMethod: values.returnMethod.toUpperCase(),
          device: device.toUpperCase(),
          shop: values.shop
            ? {
                id: values.shop.shopID,
                name: values.shop.shopName,
                streetName: values.shop.streetName,
                streetNumber: values.shop.streetNumber,
                postcode: values.shop.zip,
                city: values.shop.city,
                isocode: values.shop.isocode,
                email: values.shop.shopEmail,
              }
            : undefined,
        },
      },
      context: { headers: { 're-captcha-token': token } },
    });

    document.location.href = baseURL.getPathname(data.thankYouUrl);
  };

  return (
    <Form.Form {...props} onSubmit={handleSubmit(onSubmit)} p={{ _: '0 16px', small: '0' }} maxWidth="570px">
      <SectionHeading>{translations.yourData}</SectionHeading>

      <Controller as={<GenderField mb="4" />} name="gender" defaultValue="men" control={control} />

      <StyledTextField
        ref={register({ required: translations.errorRequiredText })}
        name="firstName"
        label={`${translations.firstName}*`}
        error={errors.firstName}
      />

      <StyledTextField
        ref={register({ required: translations.errorRequiredText })}
        name="lastName"
        label={`${translations.lastName}*`}
        error={errors.lastName}
      />

      <StyledTextField
        ref={register({
          required: translations.errorRequiredText,
          // TODO: Add comment to regex
          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: translations.errorEmailText },
        })}
        name="email"
        label={`${translations.email}*`}
        error={errors.email}
      />

      <StyledTextField ref={register} name="phoneNumber" label={translations.phoneNumber} />

      <StyledTextField
        ref={register({ required: translations.errorRequiredText })}
        name="address"
        label={`${translations.address}*`}
        error={errors.address}
      />

      <StyledTextField ref={register} name="addressAddition" label={translations.addressAddition} />

      <Flex>
        <StyledTextField
          ref={register({ required: translations.errorRequiredText })}
          name="postcode"
          label={`${translations.postcode}*`}
          error={errors.postcode}
          width="50%"
          mr="5"
        />

        <StyledTextField
          ref={register({ required: translations.errorRequiredText })}
          name="city"
          label={`${translations.city}*`}
          error={errors.city}
          width="100%"
        />
      </Flex>

      <Controller
        as={<CountryDropdown countries={data.countries} mb="5" />}
        name="country"
        defaultValue={data.countries.find((country) => country.isocode === userCountry) ?? data.countries[0]}
        control={control}
      />

      <SectionHeading>{translations.informationAboutYourSnowboard}</SectionHeading>

      <StyledTextField
        ref={register({ required: translations.errorRequiredText })}
        name="boardInfo"
        label={`${translations.boardInfo}*`}
        error={errors.boardInfo}
        isTextarea
      />

      <StyledTextField
        ref={register({ required: translations.errorRequiredText })}
        name="boardCondition"
        label={`${translations.boardCondition}*`}
        infoText={translations.boardConditionInfo}
        error={errors.boardCondition}
        isTextarea
      />

      <Controller as={<DonateCheckbox mb="4" />} name="donate" defaultValue={false} control={control} />

      <Controller
        as={<ReturnMethod countryField={countryField} />}
        name="returnMethod"
        defaultValue="shop"
        control={control}
      />

      {returnMethodField === 'shop' && (
        <Controller
          // negative margin for blue background on the left & right side
          as={
            <ChooseShop
              m={{ _: '12px -16px 0', small: '12px 0 0 0' }}
              sortedShops={sortedShops}
              countries={data.countries}
            />
          }
          name="shop"
          defaultValue={sortedShops[0][0]}
          control={control}
        />
      )}

      <SubmitButton isSubmitting={isSubmitting} my="4" />

      <Text mb="4" color="darkGrey" font="xs" fontWeight="bold">
        {translations.required}*
      </Text>

      <ReCaptcha />
    </Form.Form>
  );
};
