import styled, { keyframes } from 'styled-components';
import Box from './Box';

const animation = keyframes`
  to {
    background-position:
      calc(100% + 50px) 0,
      0 0;
  }
`;

export default styled(Box)`
  background-image: linear-gradient(
      90deg,
      ${({ theme }) => {
        const { red, green, blue } = theme.hexToRgb(theme.colors.lightGrey);

        return `
          rgba(${red}, ${green}, ${blue}, 0),
          rgba(${red}, ${green}, ${blue}, 1) 50%,
          rgba(${red}, ${green}, ${blue}, 0) 100%
        `;
      }}
    ),
    linear-gradient(${({ theme }) => theme.colors.grey} 100%, transparent 0);
  background-repeat: no-repeat;
  background-size: 50px 100%, 100% 100%;
  background-position: -50px 0, 0 0;

  animation: cubic-bezier(0.55, 0.06, 0.68, 0.19) ${animation} ${(props) => props.speed ?? '1.25s'} infinite;
`;
