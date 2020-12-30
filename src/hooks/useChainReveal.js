import React, { useEffect, useReducer } from 'react';
import { SECTION_PADDING } from '../utils';

const STATUS = {
  active: 'active',
  ready: 'ready',
  waiting: 'waiting'
};

const isVisible = id => {
  const top = document
    .querySelector(`#${id}`)
    .getBoundingClientRect().top + SECTION_PADDING;
  return top > 0 && top < window.innerHeight;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'begin':
      // Start nodes up to the first visible one
      let foundNode = false;
      return state.map(node => {
        if (!foundNode) {
          if (
            isVisible(node.id) &&
            (!action.status || action.status === node.status)
          ) foundNode = true;
          return { ...node, status: STATUS.active };
        }
        else return { ...node };
      });
    case 'end':
      // Mark successor node as ready, if visible
      return state.map((node, i) => {
        if (
          i > 0 &&
          state[i-1].id === action.id &&
          node.status === STATUS.waiting &&
          isVisible(node.id)
        ) return { ...node, status: STATUS.ready };
        else return { ...node };
      });
    default:
      return state;
  }
};

const useChainReveal = nodeIds => {
  const [nodes, dispatch] = useReducer(
    reducer,
    nodeIds.map(id => ({ id, status: STATUS.waiting }))
  );

  useEffect(() => dispatch({ type: 'begin' }), []);

  useEffect(() => {
    let timeoutId;
    if (nodes.some(node => node.status === STATUS.ready)) {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'begin', status: STATUS.ready });
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [nodes]);

  useEffect(() => {
    const events = ['resize', 'scroll'];
    const listener = () => {
      // A scroll event is triggered by <Link /> on page change,
      // so to avoid immediately starting all waiting nodes, don't
      // dispatch after the first render (when the 'init' action
      // hasn't been run yet)
      if (
        nodes[0].status !== STATUS.waiting &&
        nodes.some(node => node.status === STATUS.waiting)
      ) dispatch({ type: 'begin' });
    };
    events.forEach(event => window.addEventListener(event, listener));
    return () => events.forEach(event => {
      window.removeEventListener(event, listener);
    });
  }, [nodes]);

  const shouldReveal = nodes.reduce((acc, curr) => {
    acc[curr.id] = curr.status === STATUS.active;
    return acc;
  }, {});

  return [dispatch, shouldReveal];
};

const ChainRevealDispatch = React.createContext(null);

export default useChainReveal;
export { ChainRevealDispatch }; 
