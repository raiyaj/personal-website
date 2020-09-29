import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import content from '../../content/index.yaml';

const Home = () => {
  const { bio, social } = content.sections.home;
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: {eq: "content/images/me.jpg"}) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        },
        allFile(filter: {relativeDirectory: {eq: "components/sections"}}) {
          nodes {
            name
          }
        }
      }
    `
  );
  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: bio }}></div>
      <Image fluid={data.file.childImageSharp.fluid} />
      {
        social.map(element => <p key={element.icon}>{element.icon}</p>)
      }
      {
        data.allFile.nodes.map(node => <p key={node.name}>{node.name}</p>)
      }
    </section>
  );
};

export default Home;
