import React from 'react';
import { ThemeProvider } from 'styled-components';
import value from '@context';

export default ({ ...props }) => <ThemeProvider {...props} theme={value.theme} />;
