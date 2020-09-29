import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Nav from './nav';
import { GlobalStyle } from '../styles';

const Layout = ({ children }) => {
  return (
    <div id='root'>
      <GlobalStyle />
      <Nav />
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </div>
  );
};

const LayoutWrapper = styled.div`
  margin: 10rem auto;
  width: 60vw;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
