import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --cream: #e9f0eb;
  }

  body {
    background-color: var(--cream);
  }
`;

export default GlobalStyle;
