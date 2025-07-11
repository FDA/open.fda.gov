/* @flow */

import React from 'react'
import {marked} from 'marked'
import cx from 'classnames'

import RenderContentObject from './RenderContentObject'
import InteractiveInfographic from './InteractiveInfographic'
import InfographicContainer from '../containers/InfographicContainer'

type tPROPS = {
  content: Array<Object|string>;
  examples: Array<Object>;
  explorers: Object;
  infographicDefinitions: any;
  infographics: any;
  fields: Object;
  showMenu: boolean;
  meta: { start: string;
    api_path: string; };
  fieldsMapped: Object;
  fieldsFlattened: Record<string, string>;
};


// reads in _content.yaml from ideally anywhere
// and knows what component to render for each field
const Content = (props: tPROPS) => {
  const {
    content,
    examples,
    infographicDefinitions,
    infographics,
    fieldsMapped,
    fieldsFlattened,
    explorers,
    fields,
    showMenu,
    meta,
  } = props

  return (
    <section
      id='start-of-content'
      style={{
        maxWidth: '100%',
      }}>
      {
        content.map((words: string|Object, i) => {
          // lies, IT IS NOT WORDS
          // basically, stuff like disclaimer
          // or examples, or fields we want to render
          // or query explorers, basicaaaaaly
          // anything in _content that is not
          // a simple string gets passed to this
          if (typeof words === 'object') {
            return (
              <RenderContentObject
                k={i}
                obj={words}
                examples={examples}
                fields={fields}
                explorers={explorers}
                fieldsMapped={fieldsMapped}
                fieldsFlattened={fieldsFlattened}
                infographicDefinitions={infographicDefinitions}
                infographics={infographics}
                meta={meta}
                key={i}
              />
            )
          }

          if (words === 'visualization') {
            return (
              <InteractiveInfographic
                infographicDefinitions={infographicDefinitions}
                key={i}
                meta={meta}
              />
            )
          }

          if (words === 'infographic') {
            return (
              <InfographicContainer
                infographics={infographics}
                meta={meta}
                fieldsFlattened={fieldsFlattened}  
                key={i}
              />
            )
          }

          // stringified markdown -> html
          const html = typeof words === 'string' ? marked(words) : '';

          // Ensure html is always a string (in case marked.parse returns a Promise)
          const htmlStr: string = typeof html === 'string' ? html : '';

          // if header, add header class, etc
          const wrapperCx: string = cx({
            'font-size-2 weight-700 marg-b-2 marg-t-3': htmlStr.indexOf('<h') !== -1,
            'font-size-5 marg-t-2 marg-b-2': htmlStr.indexOf('<p>') !== -1,
          })


          // below is where we handle just plain normal text
          // but we need to handle some edge cases first
          // specifically, all external links need the external link icon
          // so we
          // 1) check for http://
          // 2) use regex to grab all tags that match
          // 3) loop over matches, incrementally wrapping external links
          //    with our wrapper class (link-external)
          // 4) finally output the linkified (or not) text
          const hasLink: boolean = htmlStr.indexOf('http://') !== -1
          // regex for matching <a> tags WITH a valid http:// href
          const httpRE: RegExp = /<a[\s]+[^>]*?href[\s]?=[\s\"\']*(http:\/\/.*?)[\"\']*.*?>([^<]+|.*?)?<\/a>/gm
          // if no external links, just output the markdownified text
          // otherwise, we'll need to string replace the external links
          // with a wrapper element, for the external link icon
          let finalOutput: string = htmlStr

          if (hasLink) {
            // array of matches, we should have at least one
             const matches: string[] | null | undefined = typeof html === 'string' ? html.match(httpRE) : null

            // but just to be safe
            if (matches) {
              for (const match of matches) {
                const intermediate: string = finalOutput.replace(match, `<span>${match}</span>`)
                finalOutput = intermediate
              }
            }
          }

          return (
            <div
              key={i}
              className={wrapperCx}
              tabIndex={0}
              dangerouslySetInnerHTML={{__html: finalOutput}}
            />
          )
        })
      }
    </section>
  )
}

Content.displayName = 'component/Content'
export default Content
