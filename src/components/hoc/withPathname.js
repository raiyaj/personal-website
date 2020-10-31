import React from 'react';
import { Location } from '@reach/router';  // router implemented by gatsby

const withLocation = Component => props => {
  return (
    <Location>
      {({ location }) => <Component {...props} pathname={location.pathname} />}
    </Location>
  );
};

export default withLocation;
