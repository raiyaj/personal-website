import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { useLocation } from '@reach/router';
import Terminal from './terminal';
import { useTerminal } from '../hooks';
import { smoothScroll } from '../utils';
import content from '../../content/content.yaml';

const Nav = () => {
  const [showResult, setShowResult] = useTerminal('nav');

  const data = useStaticQuery(graphql`
    query LastUpdate {
      allFile(sort: {fields: modifiedTime, order: DESC}, limit: 1) {
        nodes {
          modifiedTime
        }
      }
    }
  `);

  const { contact } = content.nav;
  const { pathname } = useLocation();
  const directory = pathname.split('/')[1] || 'home';
  const lastUpdate =
    new Date(data.allFile.nodes[0].modifiedTime)
      .toString()
      .split(' ')
      .filter((_, i) => i < 5 && i !== 3)
      .join(' ');
  const treeData = [
    [
      { name: 'home', url: '/', children: [{ name: 'about' }] },
      { name: 'blog', url: '/blog' }
    ],
    [
      { name: 'contact', children: contact }
    ]
  ];

  return (
    <nav className='font-mono' id='nav'>
      <div>Last update: {lastUpdate}</div>
      <Terminal
        animatePrompt={directory === 'home'}
        command='tree'
        setShowResult={setShowResult}
        showResult={showResult}
      />
      <Tree className={showResult ? '' : 'hide'}>
        {treeData.map((tree, i) => (
          <ul key={i}>
            {tree.map(branch => (
              <li key={branch.name}>
                {branch.url
                  ? <Link
                      to={branch.url}
                      activeClassName='active'
                      partiallyActive={branch.name === directory}
                      onClick={branch.name === directory ? smoothScroll : undefined}
                    >
                      {branch.name}
                    </Link>
                  : branch.name
                }
                {branch.children &&
                  <ul>
                    {branch.children.map(twig => (
                      <li key={twig.name}>
                        {twig.url
                          ? <a href={twig.url}>{twig.name}</a>
                          : <Link
                              to={`${branch.url}#${twig.name}`}
                              onClick={branch.name === directory
                                ? e => smoothScroll(e, `#${twig.name}`)
                                : undefined
                              }
                            >
                              {twig.name}
                            </Link>
                        }
                      </li>
                    ))}
                  </ul>
                }
              </li>
            ))}
          </ul>
        ))}
      </Tree>
    </nav>
  );
};

const Tree = styled.div`
  display: flex;
  align-items: flex-start;
  
  ul {
    border-left: 1.2px solid var(--light-green);
    margin-bottom: 0;
    margin-left: 1.1rem;
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

  ${({ theme }) => theme.bp.sm} {
    flex-direction: column;

    ul:not(:first-child) {
      margin-top: 0;
    }
  }
`;

export default Nav;
