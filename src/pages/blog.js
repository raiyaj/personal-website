import React from 'react';
import { Layout } from '../components';
import { useNav } from '../hooks';

const App = () => {
  const nav = useNav();

  return (
    <Layout>
      {nav}
      <div>Work in progress!</div>
    </Layout>
  );
};

export default App;
