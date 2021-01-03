import React, { useEffect, useState } from 'react';
import styled from '@/astyle';
import { Controller, useForm } from 'react-hook-form';
import { Box, Dropdown, Input, Label, Text } from '@shared/components';

const StyledLabel = styled(Label, {
  display: 'flex',
  flexDirection: 'column',
  mb: 4,
});

const LabelText = styled(Text, {
  mb: 1,
  font: '$xs',
  fontWeight: '700',
  color: '$anthrazit',
});

export default ({ data, ...props }) => {
  const { control, register, watch } = useForm();
  const [result, setResult] = useState('');
  const fields = watch();

  useEffect(() => {
    const weight = Number(fields.weight);
    const level = data.options.find((option) => option.title === fields.level);

    if (!weight || !level) {
      setResult('');

      return;
    }

    const startVolume = Math.round(weight / level.endRange);
    const endVolume = Math.round(weight / level.startRange);

    setResult(`${startVolume} - ${endVolume} ${data.resultUnit}`);
  }, [fields, data.resultUnit, data.options]);

  return (
    <Box {...props}>
      <form onSubmit={(event) => event.preventDefault()}>
        <StyledLabel>
          <LabelText>{data.labels.level}</LabelText>
          <Controller
            control={control}
            name="level"
            defaultValue={data.options[0].title}
            render={({ onChange }) => (
              <Dropdown
                defaultValue={data.options[0].title}
                values={data.options.map((option) => ({
                  value: option.title,
                  text: option.title,
                }))}
                onChange={onChange}
              />
            )}
          />
        </StyledLabel>

        <StyledLabel>
          <LabelText>{data.labels.weight}</LabelText>
          <Input ref={register} name="weight" type="number" min="1" max="200" />
        </StyledLabel>
      </form>

      <StyledLabel>
        <LabelText>{data.labels.result}</LabelText>
        <Input
          css={{
            font: '$m',
            fontWeight: '700',
            color: '$buyersguideGreen',
          }}
          readOnly
          value={result}
        />
      </StyledLabel>

      {/* EASTER EGG */}
      {fields.weight === '12345' && (
        <iframe
          title="Calculator easter egg"
          style={{
            width: '560px',
            height: '315px',
          }}
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sNypbmPPDco"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </Box>
  );
};
