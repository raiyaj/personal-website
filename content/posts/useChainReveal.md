# `useChainReveal`: A React Hook for Revealing Chain-based Animations

Welcome to my blog! I've been working on building this Gatsby + React site, which includes an interesting loading animation where the [homepage]('/') sections appear one after the other. I wrote a neat custom hook, `useChainReveal`, that's been useful for displaying a chain of animated components, where the animation durations are unknown and one shouldn't start until the one before it ends, so a component has to trigger a state change when it's done.

## Conceptualizing state

Each component (let's call it a node) has one of four statuses: `waiting` (predecessor is not `done`), `ready` (predecessor is `done` but the animation hasn't started yet), `active` (animation is in progress), or `done` (animation is over). Here's the effect we're after:

...

Let's define the statuses:

```js
const STATUS = {
  waiting: 'waiting',
  ready: 'ready',
  active: 'active'
};
```

You might've noticed `done` is missing - we'll keep it in our conceptual view, but our implementaion doesn't need it.

If we're given an `id` for each node in the chain, we can use an array of objects to keep track of the statuses. Since our state involves multiple values that depend on one another, [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) is ideal for handling it. It takes a reducer (which we'll define soon) and an initial state (all the nodes are `waiting`). It also returns the state and a `dispatch` method that we'll use to change state later on.

Now it's easy to tell when a given node should start animating: its status becomes `active`! From our hook, we can return `dispatch` and a `shouldReveal` object that maps node `id`s to boolean values representing whether or not they're `active`.

```js
import React, { useReducer } from 'react';

// const STATUS = ...

const useChainReveal = nodeIds => {
  const [nodes, dispatch] = useReducer(
    reducer,
    nodeIds.map(id => ({ id, status: STATUS.waiting }))
  );

  const shouldReveal = nodes.reduce((acc, curr) => {
    acc[curr.id] = curr.status === STATUS.active;
    return acc;
  }, {});

  return [dispatch, shouldReveal];
};

export default useChainReveal;
```

## Rendering the components

To see our hook taking shape, we need to render components involving some sort of animation.

I've left a bit of styling out in this snippet (feel free to browse the [full code](https://github.com/raiyaj/snippets/tree/master/use-chain-reveal)!), but it defines a new component called `Stripe`. Essentially, it's a `div` that pops into view when the `shouldReveal` prop is `true`, with some help from [styled-components](https://styled-components.com) and the animation library [anime.js](https://animejs.com). It's important for the `div`'s `id` attribute to match the `id` prop because our hook will end up searching the DOM for nodes by `id`.

```js
import React, { useEffect } from 'react';
import anime from 'animejs';
import styled from 'styled-components';

const Stripe = ({ id, shouldReveal }) => {
  useEffect(() => {
    if (shouldReveal) {
      anime({
        // Bounce + fade up
        targets: `#${id}`,
        opacity: 1,
        translateY: -20,
        easing: 'spring(0, 10, 5, 20)'
      });
    }
  }, [shouldReveal]);

  return <StyledStripe id={id} color={getColor(id)} />;
};

const StyledStripe = styled.div`
  width: 95vw;
  height: 50px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  margin: 20px auto;
  opacity: 0;
`;

export default Stripe;
```

Now, let's use `useChainReveal` to render a chain of `Stripe`s.

...That was a bit anti-climactic. 

```js
```

## The `start` action

## The `finish` action

## Handling scrolling

Here's the final product:

...

It's been a fun challenge... Take a look at the [full code]() and a published [demo](). Thanks for reading!
