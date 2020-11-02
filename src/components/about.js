import React from 'react';
import PropTypes from 'prop-types';
import Terminal from './terminal';
import content from '../../content/content.yaml';

const About = ({ isDoneAnimation }) => {
  const { bio } = content.about;

  return (
    <section id='about'>
      <Terminal
        command='whoami'
        componentId='about'
        isDoneAnimation={isDoneAnimation}
      />
      <div className={isDoneAnimation ? '' : 'hide'}>
        {bio.split('\n').map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>
    </section>
  );
};

About.propTypes = {
  isDoneAnimation: PropTypes.bool.isRequired
};

export default About;
