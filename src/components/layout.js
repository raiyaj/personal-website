import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import Header from './header';
import { theme, GlobalStyle } from '../styles';

const Layout = ({ children }) => {
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
}

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
