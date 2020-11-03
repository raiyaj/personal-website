import React from 'react';
import { Location } from '@reach/router';  // Router implemented by gatsby

const withLocation = Component => props => {
  // https://reach.tech/router/api/Location
  return (
    <Location>
      {({ location }) => <Component {...props} pathname={location.pathname} />}
    </Location>
  );
}

export default withLocation;
