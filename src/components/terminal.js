import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import withPathname from './hoc/withPathname';
import { ChainRevealDispatch } from '../hooks';
import { smoothScroll } from '../utils';

const Terminal = ({
  animatePrompt,
  command,
  componentId,
  pathname,
  setShowContent,
  showContent
}) => {
  const [typed, setTyped] = useState('');
  const [showPrompt, setShowPrompt] = useState(!animatePrompt);

  const dispatch = useContext(ChainRevealDispatch);

  useEffect(() => {
    const delay = typed && typed !== command ? 135 : 600;
    const timeoutId = setTimeout(() => {
      if (!showPrompt) setShowPrompt(true);
      else if (!typed) setTyped(command[0]);
      else if (typed !== command) {
        setTyped(command.substr(0, typed.length + 1));
      }
      else if (setShowContent) setShowContent(true);
      else dispatch({ type: 'finish', id: componentId });
    }, delay);
    return () => clearTimeout(timeoutId);
  // `dispatch` and `setShowContent` function identities are stable,
  // and neither `command` nor `componentId` should ever change,
  // so all are safe to omit. Don't omit dependencies altogether,
  // else effect will continually dispatch and cause a re-render.
  // https://reactjs.org/docs/hooks-reference.html
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPrompt, typed]);

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
  display: inline-block;  /* Transforms don't apply to inline elements */
  transform: scale(1.3);
  position: relative;
  bottom: .1rem;
  margin-left: -.1rem;
  animation: 1.25s blink step-start infinite;
`;

Terminal.propTypes = {
  animatePrompt: PropTypes.bool,
  command: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  setShowContent: PropTypes.func,
  showContent: PropTypes.bool.isRequired
};

Terminal.defaultProps = {
  animatePrompt: false
};

export default withPathname(Terminal);
