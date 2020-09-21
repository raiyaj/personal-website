import React from 'react';
import { GlobalStyle } from '../styles';

const Layout = ({ children }) => {
  return (
    <div id='root'>
      <GlobalStyle />
      {children}
    </div>
  )
}

export default Layout;
