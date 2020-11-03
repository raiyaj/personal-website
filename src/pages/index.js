import React from 'react';
import { About, Layout, Nav } from '../components';
import { useChainReveal, ChainRevealDispatch } from '../hooks';

const App = () => {
  const sectionIds = ['nav', 'about'];
  const [dispatch, hasRevealed, shouldReveal] = useChainReveal(sectionIds);

  return (
    <Layout>
      <ChainRevealDispatch.Provider value={dispatch}>
        <Nav showContent={hasRevealed('nav')} />
        {shouldReveal('about') && <About showContent={hasRevealed('about')} />}
      </ChainRevealDispatch.Provider>
    </Layout>
  );
};

export default App;
