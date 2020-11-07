import React, { useEffect, useReducer } from 'react';
import { PADDING } from '../utils';

const STATUS = {
  active: 'active',
  ready: 'ready',
  waiting: 'waiting'
};

const isVisible = id => {
  const top = document
    .querySelector(`#${id}`)
    .getBoundingClientRect().top;
  return top + PADDING > 0 && top + PADDING < window.innerHeight;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      // Start all nodes up to the first visible one
      let someNodeVisible = false;
      return state.map(node => {
        if (!someNodeVisible) {
          if (isVisible(node.id)) someNodeVisible = true;
          return { ...node, status: STATUS.active };
        }
        else return { ...node };
      });
    case 'begin':
      return state.map(node => (
        node.status === action.status && isVisible(node.id)
        ? { ...node, status: STATUS.active }
        : { ...node }
      ));
    case 'end':
      // Mark the node's successor as ready, if necessary
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

  useEffect(() => dispatch({ type: 'init' }), []);

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
      ) dispatch({ type: 'begin', status: STATUS.waiting });
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
