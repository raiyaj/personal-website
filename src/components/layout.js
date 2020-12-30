import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../styles';

const Layout = ({ children }) => {
  useEffect(() => {
    // Modify external links (assume all are already mounted)
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
    Array.from(document.querySelectorAll('a'))
      .filter(a => a.host !== window.location.host)
      .forEach(a => {
        a.setAttribute('target', '_blank');
        // https://mathiasbynens.github.io/rel-noopener
        a.setAttribute('rel', 'noopener noreferrer');
      });
  }, []);

  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledLayout>
          {children}
        </StyledLayout>
      </ThemeProvider>
    </div>
  );
};

const StyledLayout = styled.div`
  margin: 6rem auto;
  max-width: 800px;
  width: 70vw;

  ${({ theme }) => theme.bp.lg} {
    width: 80vw;
  }

  ${({ theme }) => theme.bp.sm} {
    width: 85vw;
  }
`;

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
