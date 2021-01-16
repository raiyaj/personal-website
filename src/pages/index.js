import React from 'react';
import { About, ChainReveal } from '../components';

const Home = () => {
  const components = {
    about: About
  };
  return <ChainReveal components={components} />;
};

export default Home;
