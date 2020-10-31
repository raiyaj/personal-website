import React, { useState } from 'react';
import Terminal from './terminal';
import content from '../../content/content.yaml';

const About = () => {
  const [showContent, setShowContent] = useState(false);

  const { bio } = content.about;

  return (
    <section id='about'>
      <Terminal
        command='whoami'
        showContent={showContent}
        setShowContent={setShowContent}
      />
      <div className={showContent ? '' : 'hide'}>
        {bio.split('\n').map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>
    </section>
  );
};

export default About;
