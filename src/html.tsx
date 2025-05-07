/* @flow */

import React from 'react'
import faviconPNG from './favicon.png'
import 'react-table/react-table.css'; // Directly import the CSS file

const webFontLoader: string = `
  WebFontConfig = {
    google: {
      families: ['Merriweather:400,700', 'Source Sans Pro:400,600']
    }
  }
  ;(function(d) {
     var wf = d.createElement('script'), s = d.scripts[0];
     wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js';
     s.parentNode.insertBefore(wf, s);
  })(document);
`

type tPROPS = {
  body: string,
  title: string,
  favicon?: string, // Add favicon as an optional property
  headComponents?: React.ReactNode, // Add headComponents as an optional property
  postBodyComponents?: React.ReactNode, // Add postBodyComponents as an optional property
};

const HTML = ({ title = 'openFDA', favicon = faviconPNG, body, postBodyComponents, headComponents }: tPROPS) => (
  <html
    // ref='html' is removed as it is not valid in modern React
    lang='en'>
    <head>
      {headComponents}
      <meta charSet='utf-8' />
      <meta
        httpEquiv='X-UA-Compatible'
        content='IE=edge'
      />
      <meta
        name='viewport'
        content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'
      />
      <meta
        name='description'
        content='openFDA'
      />
      <meta httpEquiv='Content-Type'
        content='text/html; charset=UTF-8' />
      <link
        rel='preconnect'
        // get that handshake going to
        // cut down on our latency a bit
        href='https://cdnjs.cloudflare.com'
      />
      <script src='https://use.fontawesome.com/300ab20b15.js'/>
      <link
        rel='shortcut icon'
        href={faviconPNG}
      />
      <script
        async
        dangerouslySetInnerHTML={{
          __html: webFontLoader,
        }}
      />
      {
        // We participate in the US government's analytics program. See the data at analytics.usa.gov.}
      }
      <script async type='text/javascript' src='https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=HHS' id='_fed_an_ua_tag' />

      <link rel='stylesheet' href='https://unpkg.com/react-select@1.2.1/dist/react-select.css' />
    </head>
    <body>
      <div
        id='___gatsby'
        dangerouslySetInnerHTML={{__html: body}}
      />
      {postBodyComponents}
    </body>
  </html>
)

HTML.displayName = 'HTML - Server Side Render'
export default HTML