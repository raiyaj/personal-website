import React from 'react';
import { About, Layout, Nav } from '../components';
import useSequentialAppearance, {
  AppearanceDispatch,
  APPEARANCE_STATUS
} from '../hooks/useSequentialAppearance';

const App = () => {
  const sectionIds = ['nav', 'about'];
  const [dispatch, checkStatus] = useSequentialAppearance(sectionIds);

  const isDone = id => checkStatus(id, APPEARANCE_STATUS.done);
  const hasAppeared = id => checkStatus(
    id,
    APPEARANCE_STATUS.active,
    APPEARANCE_STATUS.done
  );

  return (
    <Layout>
      <AppearanceDispatch.Provider value={dispatch}>
        <Nav isDoneAnimation={isDone('nav')} />
        {hasAppeared('about') && <About isDoneAnimation={isDone('about')}/>}
      </AppearanceDispatch.Provider>
    </Layout>
  );
};

export default App;
