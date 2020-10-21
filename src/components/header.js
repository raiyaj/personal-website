import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Terminal from './terminal';
import content from '../../content/content.yaml';

const Header = () => {
  const [showNav, setShowNav] = useState(false);

  const { contact } = content.header;
  const data = useStaticQuery(
    graphql`
      query {
        allFile(sort: {fields: modifiedTime, order: DESC}, limit: 1) {
          nodes {
            modifiedTime
          }
        }
      }
    `
  );
  // format date as Mon Jan 01 21:30:00
  const lastUpdate = new Date(data.allFile.nodes[0].modifiedTime)
    .toString()
    .split(' ')
    .slice(0, 5)
    .filter((_, i) => i !== 3)
    .join(' ');

  return (
    <header className='font-mono'>
      <div>Last update: {lastUpdate}</div>
      <Terminal
        animate
        command='tree'
        showResult={showNav}
        setShowResult={setShowNav}
      />
      <Nav className={showNav ? '' : 'hide'}>
        <ul>
          <li>
            <Link to='/' className='active'>home</Link>
            <ul>
              <li><a href='#introduction'>introduction</a></li>
              <li><a href='#projects'>projects</a></li>
              <li><a href='#latest'>latest</a></li>
            </ul>
          </li>
          <li><Link to='/blog'>blog</Link></li>
        </ul>
        <ul>
          <li>
            contact
            <ul>
              {contact.map(item => (
                <li key={item.name}>
                  <a href={item.url}>{item.name}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </Nav>
    </header>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: flex-start;
  
  ul {
    border-left: 1.2px solid var(--light-green);
    margin-left: 1.2rem;
    padding-inline-start: unset;
  }

  li {
    list-style-type: none;

    &:before {
      content: '--';
      color: var(--pink);
      margin-right: .5rem;
    }
  }
`;

export default Header;
