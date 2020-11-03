import React from 'react';
import PropTypes from 'prop-types';
import Terminal from './terminal';
import content from '../../content/content.yaml';

const About = ({ showContent }) => {
  const { bio } = content.about;

  return (
    <section id='about'>
      <Terminal
        command='whoami'
        componentId='about'
        showContent={showContent}
      />
      <div className={showContent ? '' : 'hide'}>
        {bio.split('\n').map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }}></p>
        ))}
      </div>
    </section>
  );
};

About.propTypes = {
  showContent: PropTypes.bool.isRequired
};

export default About;
