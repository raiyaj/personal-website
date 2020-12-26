import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Terminal from './terminal';
import { useTerminal } from '../hooks';
import { smoothScroll } from '../utils';
import content from '../../content/content.yaml';

const About = ({ shouldReveal }) => {
  const [
    showResult,
    setShowResult,
    startTyping
  ] = useTerminal('about', shouldReveal);

  const { bio } = content.about;

  useEffect(() => {
    const anchors = Array.from(
      document.querySelectorAll('#about p a')
    ).filter(a => a.host === window.location.host);
    anchors.forEach(a => a.addEventListener(
      'click', e => smoothScroll(e, a.attributes.href.value)
    ));
    return () => anchors.forEach(a => a.removeEventListener(
      'click', e => smoothScroll(e, a.attributes.href.value)
    ));
  }, [bio]);

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
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}/>
        ))}
      </div>
    </section>
  );
};

About.propTypes = {
  shouldReveal: PropTypes.bool.isRequired
};

export default About;
