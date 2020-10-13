import React from 'react';
import styled from 'styled-components';
import Header from './header';
import { GlobalStyle } from '../styles';

const Layout = ({ children }) => {
  return (
    <div id='root'>
      <GlobalStyle />
      <StyledLayout>
        <Header />
        {children}
      </StyledLayout>
    </div>
  );
};

const StyledLayout = styled.div`
  margin: 8rem auto;
  width: 60vw;
`;

export default Layout;
