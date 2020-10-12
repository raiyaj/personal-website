import React from 'react';
import PropTypes from 'prop-types';
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

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
