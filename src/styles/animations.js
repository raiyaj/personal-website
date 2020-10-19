import { css } from 'styled-components';

const keyframes = css`
  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: var(--blue);
    }
  }
`;

export { keyframes };
