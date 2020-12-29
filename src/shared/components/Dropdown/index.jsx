import React from 'react';
import { reduce, map } from 'lodash-es';
import Option from '../Option';
import Select from './Select';

const mapValuesToOptions = (values) =>
  values.map(({ value, text, disabled }) => (
    <Option key={value} value={value} disabled={disabled}>
      {text}
    </Option>
  ));

export default ({ values, defaultValue, onChange, CustomSelect, ...props }) => {
  const SelectedSelect = CustomSelect ?? Select;
  const valuesIsArray = Array.isArray(values);
  const rawValues = valuesIsArray ? values : reduce(values, (acc, value) => [...acc, ...value], []);

  return (
    <SelectedSelect defaultValue={defaultValue} onChange={({ target }) => onChange?.(target.value)} {...props}>
      {defaultValue && !rawValues.some(({ value }) => value === defaultValue) && (
        <Option disabled hidden>
          {defaultValue}
        </Option>
      )}

      {valuesIsArray
        ? mapValuesToOptions(values)
        : map(values, (value, key) => (
            <optgroup key={key} label={key}>
              {mapValuesToOptions(value)}
            </optgroup>
          ))}
    </SelectedSelect>
  );
};
