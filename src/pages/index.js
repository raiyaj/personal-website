import React from 'react';
import { About, ChainReveal } from '../components';

const Homepage = () => {
  const components = {
    about: About
  };
  return <ChainReveal components={components} />;
};

export default Homepage;
