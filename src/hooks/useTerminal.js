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
        // bounce + fade up
        targets: `#${id}`,
        opacity: 1,
        translateY: -10,
        easing: 'spring(0, 10, 80, 22)',
        update: anim => {
          if (!startTyping && anim.progress > 15) setStartTyping(true)
        }
      });
    }
  }, [animate, id, startTyping]);

  useEffect(() => {
    if (showResult && dispatch) dispatch({ type: 'end', id });
  }, [dispatch, id, showResult]);  // `dispatch` is safe to omit

  return [showResult, setShowResult, startTyping];
};

export default useTerminal;
