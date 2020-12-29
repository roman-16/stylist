import React, { useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import { Box } from '@shared/components';
import Dialog from './Dialog';

const topPosition = 0.3; // 30%

export default ({ onClose, children, ...props }) => {
  const { y } = useWindowScroll();
  // useWindowSize so that on resize the dialog would still be correctly positionated
  const { height } = useWindowSize();
  const [initialTopOffset, setInitialTopOffset] = useState(height * topPosition);

  useEffect(() => {
    setInitialTopOffset(height * topPosition);
  }, [height]);

  return (
    <Box
      position={y >= initialTopOffset ? 'fixed' : 'absolute'}
      top={y >= initialTopOffset ? '0px' : `${topPosition * 100}%`}
      right="0"
      {...props}
    >
      <Dialog onClose={onClose}>{children}</Dialog>
    </Box>
  );
};
