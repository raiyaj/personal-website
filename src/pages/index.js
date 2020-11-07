import React from 'react';
import styled from 'styled-components';
import { About, Layout, Nav } from '../components';
import { useChainReveal, ChainRevealDispatch } from '../hooks';

const App = () => {
  const waitingComponents = {
    about: About
  };
  const [dispatch, shouldReveal] = useChainReveal(
    ['nav', ...Object.keys(waitingComponents)]
  );

  return (
    <Home>
      <Layout>
        <ChainRevealDispatch.Provider value={dispatch}>
          <Nav />
          {Object.entries(waitingComponents).map(([id, Component]) => (
            <Component key={id} shouldReveal={shouldReveal[id]} />
          ))}
        </ChainRevealDispatch.Provider>
      </Layout>
    </Home>
  );
};

const Home = styled.div`
  section {
    opacity: 0;
  }
`;

export default App;
