import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Nav } from '../components';
import { useChainReveal, ChainRevealDispatch } from '../hooks';

const ChainReveal = ({ components }) => {
  const [dispatch, shouldReveal] = useChainReveal(
    ['nav', ...Object.keys(components)]
  );

  return (
    <StyledChainReveal>
      <Layout>
        <ChainRevealDispatch.Provider value={dispatch}>
          <Nav />
          {Object.entries(components).map(([id, Component]) => (
            <Component key={id} shouldReveal={shouldReveal[id]} />
          ))}
        </ChainRevealDispatch.Provider>
      </Layout>
    </StyledChainReveal>
  );
};

const StyledChainReveal = styled.div`
  section {
    opacity: 0;
  }
`;

ChainReveal.propTypes = {
  components: PropTypes.object.isRequired
};

export default ChainReveal;
