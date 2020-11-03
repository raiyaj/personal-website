import React, { useEffect, useReducer } from 'react';

const DELAY = {
  long: 600
};
const STATUS = {
  active: 'active',
  done: 'done',
  ready: 'ready',
  waiting: 'waiting'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      // Start the next ready node; only one node can be ready at a time
      return state.map(node => (
        node.status === STATUS.ready
        ? { ...node, status: STATUS.active }
        : { ...node }
      ));
    case 'finish':
      return state.map((node, i) => {
        // When a node finishes, its successor isn't necessarily waiting.
        // TODO: Make sure successor is in viewport
        let status = node.status;
        if (node.id === action.id) status = STATUS.done;
        else if (
          i > 0 &&
          state[i-1].id === action.id &&
          node.status === STATUS.waiting
        ) status = STATUS.ready;
        return { ...node, status };
      });
    default:
      return state;
  }
};

const useAppearInSequence = nodeIds => {
  const [nodes, dispatch] = useReducer(
    reducer,
    nodeIds.map((id, i) => (
      { id, status: i === 0 ? STATUS.active : STATUS.waiting }
    ))
  );

  useEffect(() => {
    let timeoutId;
    if (nodes.some(node => node.status === STATUS.ready)) {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'start' });
      }, DELAY.long);
    }
    return () => clearTimeout(timeoutId);
  }, [nodes]);

  const checkStatus = (id, ...statuses) => (
    statuses.includes(nodes.find(node => node.id === id).status)
  );
  const hasAppeared = id => checkStatus(id, STATUS.done);
  const shouldAppear = id => checkStatus(id, STATUS.active, STATUS.done);

  return [dispatch, hasAppeared, shouldAppear];
};

const AppearInSequenceDispatch = React.createContext(null);

export default useAppearInSequence;
export { AppearInSequenceDispatch }; 
