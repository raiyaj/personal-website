import { createGlobalStyle } from 'styled-components';
import { SECTION_PADDING } from '../utils';

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
    font-size: .91rem;
    letter-spacing: .5px;
    line-height: 1.35rem;
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

  nav, section {
    padding: ${SECTION_PADDING}px 0;
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
    font-size: .86rem;
    letter-spacing: 0.1px;
    word-spacing: -1px;
    
    a { 
      font-weight: bold;
    }
  }

  /* Use instead of conditional rendering to reserve space on initial mount */
  .hide {
    opacity: 0;
  }
`;

export default GlobalStyle;
