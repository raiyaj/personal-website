import React from 'react';
import { ChainReveal, NotFound } from '../components';

const NotFoundPage = () => {
  const components = {
    'not-found': NotFound
  };
  return <ChainReveal components={components} />;
};

export default NotFoundPage;
