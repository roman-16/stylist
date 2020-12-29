import React, { useEffect, useRef } from 'react';
import { optionsKnob } from '@storybook/addon-knobs';
import cookies from 'js-cookie';

const Gender = ({ children }) => {
  const isInitialMount = useRef(true);
  const gender = optionsKnob(
    'Gender',
    {
      Men: 'men',
      Women: 'women',
      Kids: 'kids',
    },
    cookies.get('gender'),
    { display: 'select' },
    'Global',
  );

  useEffect(() => {
    cookies.set('gender', gender);

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Enforce reload on new set cookie
      window.location.reload();
    }
  }, [gender]);

  return <>{children}</>;
};

export default (storyFn) => <Gender>{storyFn()}</Gender>;
