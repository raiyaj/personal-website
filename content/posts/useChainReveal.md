# `useChainReveal`: A React Hook for Revealing Sequence-based Animations

Welcome to my blog! I've been working on building this Gatsby + React site, which includes an interesting loading animation where the [homepage]('/') sections appear one after the other. I wrote a neat custom hook, `useChainReveal`, that's been useful for displaying a set of animated components in sequence, where the animation durations are unknown and one shouldn't start until the one before it ends, so a component has to trigger a state change when it's done.

## Conceptualizing state

Each component (let's call it a node) has one of four statuses: `waiting` (predecessor is not `done`), `ready` (predecessor is `done`; waiting a short delay), `active` (animation is in progress), or `done` (animation is over). Here's the effect we're after:

...

Let's define the statuses:

```javascript
const STATUS = {
  waiting: 'waiting',
  ready: 'ready',
  active: 'active'
}
```

You might've noticed `done` is missing - we'll keep it in our conceptual view, but our implementaion doesn't need it.

If we're given an id for each node in the chain, we can use an array of objects to keep track of the statuses. Since our state involves multiple values that depend on one another, let's use [`useReducer`]() to handle it. It takes a reducer (which we'll define soon) and an initial state (all the nodes are `waiting`). It also returns the state and a `dispatch` method that we'll use to change state later on.

```javascript
const useChainReveal = nodeIds => {
  const [nodes, dispatch] = useReducer(
    reducer,
    nodeIds.map(id => ({ id, status: STATUS.waiting }))
  )
}
```

Now it's easy to tell when a given node's animation should start: when its status becomes `active`! Add this to the end of the hook:

```javascript
const shouldReveal = nodes.reduce((acc, curr) => {
  acc[curr.id] = curr.status === STATUS.active
  return acc
}, {})

return [dispatch, shouldReveal]
```

## Rendering the components

## The `start` action

## The `finish` action

## Handling scrolling

Here's the final product:

...

It's been a fun challenge... Take a look at the [full code]() and a published [demo](). Thanks for reading!
