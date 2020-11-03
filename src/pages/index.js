import React from 'react';
import { About, Layout, Nav } from '../components';
import {
  useAppearInSequence,
  AppearInSequenceDispatch
} from '../hooks';

const App = () => {
  const sectionIds = ['nav', 'about'];
  const [dispatch, hasAppeared, shouldAppear] = useAppearInSequence(sectionIds);

  return (
    <Layout>
      <AppearInSequenceDispatch.Provider value={dispatch}>
        <Nav showContent={hasAppeared('nav')} />
        {shouldAppear('about') && <About showContent={hasAppeared('about')} />}
      </AppearInSequenceDispatch.Provider>
    </Layout>
  );
};

export default App;
