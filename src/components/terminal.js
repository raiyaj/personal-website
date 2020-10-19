import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Terminal = ({ animate, command, showResult, setShowResult }) => {
  const [typed, setTyped] = useState('');
  const [showPrompt, setShowPrompt] = useState(!animate);

  const delay = 750;
  const directory = window.location.pathname.split('/')[0] || '~';

  useEffect(() => {
    let intervalId;
    if (!showPrompt) {
      setTimeout(() => setShowPrompt(true), delay);
    } else if (!typed) {
      setTimeout(() => setTyped(command[0]), delay);
    } else if (typed !== command) {
      intervalId = setInterval(() => {
        setTyped(`${typed}${command[typed.length]}`);
      }, 135);
    } else {
      clearInterval(intervalId);
      setTimeout(() => setShowResult(true), delay);
    }
    return () => clearInterval(intervalId);
  });

  return (
    <div className='font-mono'>
      {showPrompt &&
        <Prompt>
          <Link to='/'>raiyajessa</Link>
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
  display: inline-block;
  line-height: 1.4rem;

  > * {
    margin-right: .4rem;
  }
`;

const Cursor = styled.span`
  font-size: 1rem;
  margin-left: -.1rem;
  animation: 1.25s blink step-start infinite;
`;

Terminal.propTypes = {
  animate: PropTypes.bool,
  command: PropTypes.string.isRequired,
  showResult: PropTypes.bool,
  setShowResult: PropTypes.func
};

Terminal.defaultProps = {
  animate: false
};

export default Terminal;
