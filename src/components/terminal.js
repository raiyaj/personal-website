import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Cursor } from '../styles/animation';

const Terminal = ({ children, command, showHeader }) => {
  const [typed, setTyped] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  const delay = 750;
  const directory = window.location.pathname.split('/')[0];

  useEffect(() => {
    let intervalId;
    if (!showPrompt) {
      setTimeout(() => setShowPrompt(true), delay);
    } else {
      if (!typed) {
        setTimeout(() => setTyped(command[0]), delay);
      } else if (typed !== command) {
        intervalId = setInterval(() => {
          setTyped(`${typed}${command[typed.length]}`);
        }, 135);
      } else {
        clearInterval(intervalId);
        setTimeout(() => setShowChildren(true), delay);
      }
    }
    return () => clearInterval(intervalId);
  });

  return (
    <StyledTerminal>
      {showHeader && (
        <div>
          Last update: Sun Oct 11 10:33:57
        </div>
      )}
      {showPrompt &&
        <Prompt>
          <Link to='/'>raiyajessa</Link>
          <span className='light-green'>@</span>
          <span className='pink'>{directory || '~'}</span>
          <span className='light-green'>$</span>
        </Prompt>
      }
      <b className='dark-green'>{typed}</b>
      {!showChildren && <Cursor>|</Cursor>}
      {showChildren && children}
    </StyledTerminal>
  )
};

const StyledTerminal = styled.div`
  font-family: var(--font-mono);
  font-size: small;
`;

const Prompt = styled.div`
  display: inline-block;
  line-height: 1.4rem;

  > * {
    margin-right: .4rem;
  }
`;

Terminal.defaultProps = {
  showHeader: false
};

Terminal.propTypes = {
  command: PropTypes.string.isRequired,
  showHeader: PropTypes.bool
};

export default Terminal;
