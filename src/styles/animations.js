import { css } from 'styled-components';

export const keyframes = css`
  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: var(--blue);
    }
  }
`;
