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
    --font-sans: 'Roboto', sans-serif;
  }

  body {
    color: var(--blue);
    font-family: var(--font-sans);
    font-size: .85rem;
    letter-spacing: .5px;
    line-height: 1.2rem;
  }

  header, section {
    padding: 3rem 0;
  }

  a {
    color: var(--green);
    cursor: pointer;
    font-weight: 500;
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
    letter-spacing: .3px;
    
    a { 
      font-weight: bold;
    }
  }

  .hide {
    opacity: 0;
  }

  ${keyframes};
`;

export default GlobalStyle;
