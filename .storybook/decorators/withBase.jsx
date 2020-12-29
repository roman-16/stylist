import React from 'react';

export default (storyFn) => (
  <>
    <base href="https://www.blue-tomato.com/" target="_blank" />
    {storyFn()}
  </>
);
