const BREAKPOINTS = {
  lg: 1024,
  md: 768,
  sm: 425
};

const breakpoints = Object
  .keys(BREAKPOINTS)
  .reduce((acc, curr) => {
    acc[curr] = `@media (max-width: ${BREAKPOINTS[curr]}px)`;
    return acc;
  }, {});

const theme = {
  bp: breakpoints
};

export default theme;
