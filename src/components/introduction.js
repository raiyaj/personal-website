import React, { useState } from 'react';
import Terminal from './terminal';
import content from '../../content/content.yaml';

const Introduction = () => {
  const [showIntro, setShowIntro] = useState(false);

  const { bio } = content.introduction;

  return (
    <section id='introduction'>
      <Terminal
        command='whoami'
        showResult={showIntro}
        setShowResult={setShowIntro}
      />
      <div className={showIntro ? '' : 'hide'}>
        {bio.split('\n').map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{__html: paragraph}}></p>
        ))}
      </div>
    </section>
  );
};

export default Introduction;
