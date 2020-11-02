import React, { useEffect, useReducer } from 'react';
import { About, Layout, Nav } from '../components';
import { ANIMATION_DELAY } from '../utils';

const AnimationDispatch = React.createContext(null);
const Status = Object.freeze({
  active: Symbol('active'),
  done: Symbol('done'),
  ready: Symbol('ready'),
  waiting: Symbol('waiting')
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      // Only one animation can be ready at a time
      return state.map(animation => (
        animation.status === Status.ready
        ? { ...animation, status: Status.active }
        : { ...animation }
      ));
    case 'finish':
      // When an animation finishes, its successor isn't necessarily waiting
      return state.map((animation, i) => {
        let status = animation.status;
        if (animation.name === action.name) status = Status.done;
        else if (
          i > 0 &&
          state[i-1].name === action.name &&
          animation.status === Status.waiting
        ) status = Status.ready;
        return { ...animation, status };
      });
    default:
      return state;
  }
};

const animationNames = ['nav', 'about'];

const App = () => {
  const [animations, dispatch] = useReducer(
    reducer,
    animationNames.map((name, i) => (
      { name, status: i === 0 ? Status.active : Status.waiting }
    ))
  );

  useEffect(() => {
    let timeoutId;
    if (animations.some(animation => animation.status === Status.ready)) {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'start' });
      }, ANIMATION_DELAY);
    }
    return () => clearTimeout(timeoutId);
  }, [animations]);

  const checkStatus = (name, ...statuses) => {
    const status = animations
      .find(animation => animation.name === name)
      .status;
    return statuses.includes(status);
  }
  const isDone = name => checkStatus(name, Status.done);
  const isVisible = name => checkStatus(name, Status.active, Status.done);

  return (
    <Layout>
      <AnimationDispatch.Provider value={dispatch}>
        <Nav isDoneAnimation={isDone('nav')} />
        {isVisible('about') && <About isDoneAnimation={isDone('about')}/>}
      </AnimationDispatch.Provider>
    </Layout>
  );
};

export default App;
export { AnimationDispatch, Status as AnimationStatus }; 
