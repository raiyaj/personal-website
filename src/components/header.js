import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Terminal from './terminal';
import content from '../../content/index.yaml';

const Header = () => {
  const { social } = content.header;

  return (
    <header>
      <Terminal command='tree' header={true}>
        <Tree>
          <ul>
            <li><Link to='/' className='active'>home</Link></li>
              <ul>
                <li><a href='#introduction'>introduction</a></li>
                <li><a href='#projects'>projects</a></li>
                <li><a href='#writing'>writing (latest)</a></li>
              </ul>
            <li><Link to='/blog'>blog</Link></li>
          </ul>
          <ul>
            {social.map(c => (
              <li key={c.name}><a href={c.url}>{c.name}</a></li>
            ))}
          </ul>
        </Tree>
      </Terminal> 
    </header>
  )
};

const Tree = styled.div`
  display: flex;
  align-items: flex-start;
  
  ul {
    border-left: 1.2px solid var(--pink);
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
