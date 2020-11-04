import React from 'react';
import PropTypes from 'prop-types';
import Terminal from './terminal';
import { useTerminal} from '../hooks';
import content from '../../content/content.yaml';

const About = ({ shouldReveal }) => {
  const [
    showResult,
    setShowResult,
    startTyping
  ] = useTerminal('about', shouldReveal);

  const { bio } = content.about;

  return (
    <section id='about'>
      <Terminal
        command='whoami'
        setShowResult={setShowResult}
        showResult={showResult}
        startTyping={startTyping}
      />
      <div className={showResult ? '' : 'hide'}>
        {bio.split('\n').map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>
    </section>
  );
};

About.propTypes = {
  shouldReveal: PropTypes.bool.isRequired
};

export default About;
