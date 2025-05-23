import React from "react";
import {graphql} from "gatsby";

type frontmatter = {
  title: string;
}

type MarkdownRemark = {
  html: string;
  frontmatter: frontmatter;
}

type templateProps = {
  data: {
    markdownRemark: MarkdownRemark;
  }
}

export default function Template ({ data }: templateProps) {
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