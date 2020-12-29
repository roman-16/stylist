import React, { useState } from 'react';
import { Flex, Button, Image } from '@shared/components';
import { baseURL } from '@helpers';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  opacity: ${(props) => (props.isSelected ? '0.2' : '1')};
  transition: opacity 0.1s;
`;

const emojis = [
  { src: baseURL.getPathname('/svg/smileyicons/icon-smiley-angry.svg'), alt: 'Angry' },
  { src: baseURL.getPathname('/svg/smileyicons/icon-smiley-unhappy.svg'), alt: 'Unhappy' },
  { src: baseURL.getPathname('/svg/smileyicons/icon-smiley-neutral.svg'), alt: 'Neutral' },
  { src: baseURL.getPathname('/svg/smileyicons/icon-smiley-happy.svg'), alt: 'Happy' },
  { src: baseURL.getPathname('/svg/smileyicons/icon-smiley-love.svg'), alt: 'Love' },
];

export default ({ emojiColor, onChange, ...props }) => {
  const [selectedEmoji, setSelectedEmoji] = useState();

  return (
    <Flex {...props}>
      {emojis.map(({ src, alt }, i) => (
        <StyledButton
          mr="20px"
          key={src}
          onClick={(event) => {
            event.preventDefault();
            setSelectedEmoji(i);
            onChange(i + 1);
          }}
          isSelected={selectedEmoji === i}
        >
          <Image disableLazyLoading src={src} alt={alt} />
        </StyledButton>
      ))}
    </Flex>
  );
};
