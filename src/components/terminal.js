import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import withPathname from './hoc/withPathname';
import { AnimationDispatch } from '../pages';
import { smoothScroll, ANIMATION_DELAY } from '../utils';

const Terminal = ({
  animatePrompt,
  animationName,
  command,
  isDoneAnimation,
  pathname
}) => {
  const [typed, setTyped] = useState('');
  const [showPrompt, setShowPrompt] = useState(!animatePrompt);

  const dispatch = useContext(AnimationDispatch);

  useEffect(() => {
    const delay = typed && typed !== command ? 135 : ANIMATION_DELAY;
    const timeoutId = setTimeout(() => {
      if (!showPrompt) setShowPrompt(true);
      else if (!typed) setTyped(command[0]);
      else if (typed !== command) {
        setTyped(command.substr(0, typed.length + 1));
      }
      else dispatch({ type: 'finish', name: animationName });
    }, delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrompt, typed]);

  const directory = pathname.split('/')[1] || '~';

  return (
    <div className='font-mono'>
      {showPrompt &&
        <Prompt>
          <Link to='/' onClick={directory === '~' ? smoothScroll : undefined }>
            raiyajessa
          </Link>
          <span className='light-green'>@</span>
          <span className='pink'>{directory}</span>
          <span className='light-green'>$</span>
        </Prompt>
      }
      <b className='dark-green'>{typed}</b>
      {!isDoneAnimation && <Cursor>|</Cursor>}
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
  display: inline-block;  /* Transforms don't apply to inline elements */
  transform: scale(1.3);
  position: relative;
  bottom: .1rem;
  margin-left: -.1rem;
  animation: 1.25s blink step-start infinite;
`;

Terminal.propTypes = {
  animatePrompt: PropTypes.bool,
  animationName: PropTypes.string,
  command: PropTypes.string.isRequired,
  isDoneAnimation: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired
};

Terminal.defaultProps = {
  animatePrompt: false
};

export default withPathname(Terminal);
