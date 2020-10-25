const breakpoints = {
  lg: 1024,
  md: 768,
  sm: 425
};

const breakpointQueries = Object
  .keys(breakpoints)
  .reduce((acc, curr) => {
    acc[curr] = `@media (max-width: ${breakpoints[curr]}px)`;
    return acc;
  }, {});

const theme = {
  bp: breakpointQueries
};

export default theme;
