import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../styles';
import Header from './header';

const Layout = ({ children }) => {
  useEffect(() => {
    // modify external links
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
    Array.from(document.querySelectorAll('a'))
      .filter(anchor => anchor.host !== window.location.host)
      .forEach(anchor => {
        anchor.setAttribute('target', '_blank');
        // https://mathiasbynens.github.io/rel-noopener
        anchor.setAttribute('rel', 'noopener noreferrer');
      });
  }, []);

  return (
    <div id='root'>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledLayout>
          <Header />
          {children}
        </StyledLayout>
      </ThemeProvider>
    </div>
  );
};

const StyledLayout = styled.div`
  height: 1000px;  /* temporary */
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
  children: PropTypes.element
};

export default Layout;
