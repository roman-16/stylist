import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Button, Span, Svg } from '@shared/components';
import { useContext } from '@shared/hooks';
import mutation from './mutation.graphql';

const StyledButton = styled(Button)`
  display: flex;
  align-items: baseline;
  padding: 5px 4px;
  background-color: rgba(255 255 255 / 60%);
  border-radius: 3px;
`;

const LikeSvg = styled(Svg)`
  display: block;
  width: 20px;
  height: 18px;
  fill: ${(props) => (props.isActive ? props.theme.colors.blue : props.theme.colors.darkGrey)};
`;

export default ({ style, ...props }) => {
  const { pageType } = useContext();
  const [toggleLike] = useMutation(mutation);
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    setIsActive(style.likes.likedByMe);
  }, [style.likes.likedByMe]);

  return (
    <StyledButton
      data-action="style-like"
      data-label={style.id}
      data-category={pageType}
      onClick={(e) => {
        e.preventDefault();

        setIsActive(!isActive);
        toggleLike({
          variables: {
            input: {
              styleId: style.id,
            },
          },
        });
      }}
      {...props}
    >
      <LikeSvg isActive={isActive}>
        <use xlinkHref="/svg/symbol-defs.svg#icon-heart-filled" />
      </LikeSvg>

      {style.likes.count > 0 && (
        <Span font="xs" fontSize="9px" lineHeight="1" color="anthrazit">
          {style.likes.count}
        </Span>
      )}
    </StyledButton>
  );
};
