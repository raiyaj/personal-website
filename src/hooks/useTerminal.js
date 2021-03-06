import { useContext, useEffect, useState } from 'react';
import anime from 'animejs';
import { ChainRevealDispatch } from './useChainReveal';

const useTerminal = (id, animate=false) => {
  const [showResult, setShowResult] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const dispatch = useContext(ChainRevealDispatch);

  useEffect(() => {
    if (animate) {
      anime({
        // Bounce + fade up
        targets: `#${id}`,
        opacity: 1,
        translateY: -15,
        easing: 'spring(0, 10, 5, 22)',
        update: anim => {
          if (!startTyping && anim.progress > 15) setStartTyping(true);
        }
      });
    }
  }, [animate, id, startTyping]);

  useEffect(() => {
    let timeoutId;
    if (showResult && dispatch) {
      timeoutId = setTimeout(() => {
        dispatch({ type: 'finish', id });
      }, 300);
    }
    return () => clearTimeout(timeoutId);
  }, [dispatch, id, showResult]);

  return [showResult, setShowResult, startTyping];
};

export default useTerminal;
