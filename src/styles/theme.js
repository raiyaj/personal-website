const makeBreakpoints = breakpoints => {
  return Object.keys(breakpoints).reduce((acc, curr) => {
    acc[curr] = `@media (max-width: ${breakpoints[curr]}px)`;
    return acc;
  }, {});
};

const theme = {
  bp: makeBreakpoints({
    lg: 1024,
    md: 768,
    sm: 425
  })
};

export default theme;
