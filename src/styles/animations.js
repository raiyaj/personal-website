import { keyframes } from 'styled-components';

const blink = keyframes`
  from, to {
    color: transparent;
  }
  50% {
    color: var(--blue);
  }
`;

export { blink };
