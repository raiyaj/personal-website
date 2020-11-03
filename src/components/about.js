import React, { useContext, useEffect, useState } from 'react';
import Terminal from './terminal';
import { ChainRevealDispatch } from '../hooks';
import content from '../../content/content.yaml';

const About = () => {
  const dispatch = useContext(ChainRevealDispatch);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (showResult) dispatch({ type: 'finish', id: 'about' });
  }, [dispatch, showResult]);  // `dispatch` is safe to omit

  const { bio } = content.about;

  return (
    <section id='about'>
      <Terminal
        command='whoami'
        setShowResult={setShowResult}
        showResult={showResult}
      />
      <div className={showResult ? '' : 'hide'}>
        {bio.split('\n').map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>
    </section>
  );
};

export default About;
