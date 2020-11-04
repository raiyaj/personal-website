import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import withPathname from './hoc/withPathname';
import { smoothScroll } from '../utils';

const Terminal = ({
  animatePrompt,
  command,
  pathname,
  setShowResult,
  showResult,
  startTyping
}) => {
  const [typed, setTyped] = useState('');
  const [showPrompt, setShowPrompt] = useState(!animatePrompt);

  useEffect(() => {
    const delay = typed && typed !== command ? 135 : 600;
    const timeoutId = setTimeout(() => {
      if (!showPrompt) setShowPrompt(true);
      else if (startTyping) {
        if (!typed) setTyped(command[0]);
        else if (typed !== command) {
          setTyped(command.substr(0, typed.length + 1));
        }
        else setShowResult(true);
      }
    }, delay);
    return () => clearTimeout(timeoutId);
  });

  const directory = pathname.split('/')[1] || '~';

  return (
    <div className='font-mono'>
      {showPrompt &&
        <Prompt>
          <Link to='/' onClick={directory === '~' ? smoothScroll : undefined}>
            raiyajessa
          </Link>
          <span className='light-green'>@</span>
          <span className='pink'>{directory}</span>
          <span className='light-green'>$</span>
        </Prompt>
      }
      <b className='dark-green'>{typed}</b>
      {!showResult && <Cursor>|</Cursor>}
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

  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: var(--blue);
    }
  }
`;

Terminal.propTypes = {
  animatePrompt: PropTypes.bool,
  command: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  setShowResult: PropTypes.func.isRequired,
  showResult: PropTypes.bool.isRequired,
  startTyping: PropTypes.bool
};

Terminal.defaultProps = {
  animatePrompt: false,
  startTyping: true
};

export default withPathname(Terminal);
