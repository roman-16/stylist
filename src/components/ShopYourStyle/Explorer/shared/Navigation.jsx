import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Image, Nav } from '@shared/components';

const Navigation = styled(Nav).attrs({ scrollbar: 'hidden' })`
  display: flex;
  overflow: auto;
`;

const Item = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
`;

const BorderBottom = styled.div`
  border-bottom: 2px solid black;
  width: 45px;
  margin-top: 5px;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
`;

const RoundBox = styled(Box)`
  border-radius: 100%;
  width: 80px;
  height: 80px;
  overflow: hidden;
`;

export default ({ onChange, styles, ...props }) => {
  const [selectedStyle, setSelectedStyle] = useState(0);

  return (
    <Navigation {...props}>
      {styles.map(({ src, alt }, i) => (
        <Item
          key={src}
          onClick={() => {
            onChange(i);
            setSelectedStyle(i);
          }}
        >
          <RoundBox>
            <Image
              src={{
                src,
                preset: 'pdtx2',
                width: 160,
                height: 160,
                fit: 'crop',
                align: '0,-1',
              }}
              alt={alt}
              mb="10px"
              width="100%"
            />
          </RoundBox>
          <BorderBottom isActive={i === selectedStyle} />
        </Item>
      ))}
    </Navigation>
  );
};
