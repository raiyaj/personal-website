import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import Terminal from './terminal';
import { useTerminal } from '../hooks';
import { trim } from '../utils';

const NotFound = ({ shouldReveal }) => {
  const [
    showResult,
    setShowResult,
    startTyping
  ] = useTerminal('not-found', shouldReveal);

  const { pathname } = useLocation();

  return (
    <section id='not-found' className='font-mono'>
      <Terminal
        command={`cd ${trim(pathname, '/')}`}
        showResult={showResult}
        setShowResult={setShowResult}
        startTyping={startTyping}
      />
      {showResult &&
        <p>-rsh: cd: No such file or directory (404)</p>
      }
    </section>
  );
};

NotFound.propTypes = {
  shouldReveal: PropTypes.bool.isRequired
};

export default NotFound;
