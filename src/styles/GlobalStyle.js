import { createGlobalStyle } from 'styled-components';
import { keyframes } from './animations';

const GlobalStyle = createGlobalStyle`
  :root {
    --pink: #e5c1bd;
    --light-green: #d2d0ba;
    --green: #b6be9c;
    --dark-green: #7b9e87;
    --blue: #5e747f;

    --font-mono: menlo, monospace;
  }

  body {
    color: var(--blue);
    line-height: 1.2rem;
  }

  header, section {
    padding: 3rem 0;
  }

  a {
    color: var(--green);
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;

    &:hover, &.active {
      color: var(--dark-green);
    }
  }

  .pink {
    color: var(--pink);
  }
  .light-green {
    color: var(--light-green);
  }
  .dark-green {
    color: var(--dark-green);
  }

  .font-mono {
    font-family: var(--font-mono);
    font-size: small;
  }

  .hide {
    opacity: 0;
  }

  ${keyframes};
`;

export default GlobalStyle;
