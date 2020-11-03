import React from 'react';
import { About, Layout, Nav } from '../components';
import { useChainReveal, ChainRevealDispatch } from '../hooks';

const App = () => {
  const sectionIds = ['nav', 'about'];
  const [dispatch, shouldReveal] = useChainReveal(sectionIds);

  return (
    <Layout>
      <ChainRevealDispatch.Provider value={dispatch}>
        <Nav />
        {shouldReveal('about') && <About />}
      </ChainRevealDispatch.Provider>
    </Layout>
  );
};

export default App;
