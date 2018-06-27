import React from "react";

export default function Template({
 data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;
  return (
    <section className="markdown-content">
      <h2>{frontmatter.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;