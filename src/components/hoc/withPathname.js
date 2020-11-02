import React from 'react';
import { Location } from '@reach/router';  // Router implemented by gatsby

const withLocation = Component => props => (
  <Location>
    {({ location }) => <Component {...props} pathname={location.pathname} />}
  </Location>
);

export default withLocation;
