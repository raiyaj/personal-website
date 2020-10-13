import styled from 'styled-components';

const Cursor = styled.span`
  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: var(--blue);
    }
  }

  font-size: 1rem;
  margin-left: -.1rem;
  animation: 1.25s blink step-start infinite;
`;

export { Cursor };
