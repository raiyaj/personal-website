import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import withPathname from './hoc/withPathname';
import { smoothScroll } from '../utils';

const Terminal = ({
  animatePrompt,
  command,
  pathname,
  showContent,
  setShowContent
}) => {
  const [typed, setTyped] = useState('');
  const [showPrompt, setShowPrompt] = useState(!animatePrompt);

  useEffect(() => {
    const delay = typed && typed !== command ? 135 : 600;
    const timeoutId = setTimeout(() => {
      if (!showPrompt) setShowPrompt(true);
      else if (!typed) setTyped(command[0]);
      else if (typed !== command) {
        setTyped(command.substr(0, typed.length + 1));
      }
      else setShowContent(true);
    }, delay);
    return () => clearTimeout(timeoutId);
  });

  const directory = pathname.split('/')[1] || '~';

  return (
    <div className='font-mono'>
      {showPrompt && (
        <Prompt>
          <Link to='/' {...(directory === '~' && { onClick: smoothScroll })}>
            raiyajessa
          </Link>
          <span className='light-green'>@</span>
          <span className='pink'>{directory}</span>
          <span className='light-green'>$</span>
        </Prompt>
      )}
      <b className='dark-green'>{typed}</b>
      {!showContent && <Cursor>|</Cursor>}
    </div>
  );
};

const Prompt = styled.div`
  display: inline;

  > * {
    margin-right: .4rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;  /* transforms don't apply to inline elements */
  transform: scale(1.3);
  position: relative;
  bottom: .1rem;
  margin-left: -.1rem;
  animation: 1.25s blink step-start infinite;
`;

Terminal.propTypes = {
  animatePrompt: PropTypes.bool,
  command: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  showContent: PropTypes.bool.isRequired,
  setShowContent: PropTypes.func.isRequired
};

Terminal.defaultProps = {
  animatePrompt: false
};

export default withPathname(Terminal);
