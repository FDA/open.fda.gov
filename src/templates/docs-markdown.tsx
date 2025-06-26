import React from "react";
import { graphql } from "gatsby";

export default function Template({ data }: any) {
  const node = data.allMarkdownRemark.edges[0]?.node;
  if (!node) return <div>No content found.</div>;
  const { frontmatter, html } = node;
  return (
    <section className="markdown-content">
      <h2>{frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`;