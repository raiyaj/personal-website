import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Cursor } from '../styles/animations';

const Terminal = ({ children, command, header }) => {
  const [typed, setTyped] = useState('');
  const directory = window.location.pathname.split('/')[0];

  useEffect(() => {
    setTimeout(() => {
      if (typed !== command) {
        setTyped(`${typed}${command[typed.length]}`);
      }
    }, 135);
  }, [typed, command]);

  return (
    <StyledTerminal>
      {header && (
        <div>
          Last update: Sun Oct 11 10:33:57
        </div>
      )}
      <Prompt>
        <Link to='/'>raiyajessa</Link>
        <span className='light-green'>@</span>
        <span className='pink'>{directory || '~'}</span>
        <span className='light-green'>$</span>
        <b className='dark-green'>{typed}</b>
        <Cursor>|</Cursor>
      </Prompt>
      {typed === command && children}
    </StyledTerminal>
  )
};

const StyledTerminal = styled.div`
  font-family: var(--font-mono);
  font-size: small;
`;

const Prompt = styled.div`
  > a, span {
    margin-right: .4rem;
  }
`;

Terminal.defaultProps = {
  header: false
};

Terminal.propTypes = {
  children: PropTypes.element,
  command: PropTypes.string.isRequired,
  header: PropTypes.bool
};

export default Terminal;
