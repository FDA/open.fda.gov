/* @flow */

import React from 'react'
import faviconPNG from './favicon.png'
import appCSS from '!!raw-loader!./css/build/app.css'
import reactTableCSS from '!!raw-loader!../node_modules/react-table/react-table.css'

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
};

const HTML = ({ title = 'openFDA', favicon, body, postBodyComponents, headComponents }: tPROPS) => (
  <html
    ref='html'
    lang='en'>
    <head>
      {headComponents}
      <title>{title}</title>
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
      <meta
        http-equiv='Content-Type'
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
      <style
        dangerouslySetInnerHTML={{
          // $FlowIgnore
          __html: appCSS,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          // $FlowIgnore
          __html: reactTableCSS,
        }}
      />
      {
        // in the future, we should only include the following
        // inside of an IE conditional comment, but that is a
        // huge pain inside React and especially with gatsby sooo
        // better for IE to work and the client side mount be
        // a little slower, than for IE to not work at all
        //
        // although it would be good to combine into 1 file or something
      }
      <script src='https://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-shim.min.js' />
      <script src='https://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.3.0/es5-sham.min.js' />
      <script src='https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js' />
      <script src='https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js' />

      <script src="https://unpkg.com/react@15.6.1/dist/react.js" />
      <script src="https://unpkg.com/react-dom@15.6.1/dist/react-dom.js" />
      <script src="https://unpkg.com/prop-types@15.5.10/prop-types.js" />
      <script src="https://unpkg.com/classnames@2.2.5/index.js" />
      <script src="https://unpkg.com/react-input-autosize@2.0.0/dist/react-input-autosize.js" />

      {
        // We participate in the US government's analytics program. See the data at analytics.usa.gov.}
      }
      <script async type="text/javascript" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=HHS" id="_fed_an_ua_tag" />

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
