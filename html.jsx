/* @flow */

import React from 'react'

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
  favicon: string,
};

const HTML = ({ title = 'openFDA', favicon, body }: tPROPS) => (
  <html
    ref='html'
    lang='en'>
  {console.log("body: ",body)}
    <head>
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
      <link
        rel='preconnect'
        // get that handshake going to
        // cut down on our latency a bit
        href='https://cdnjs.cloudflare.com'
      />
      <script src="https://use.fontawesome.com/300ab20b15.js"/>
      <link
        rel='shortcut icon'
        href={favicon}
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
          __html: require('!raw!./css/build/app.css')
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
    </head>
    <body>
    {console.log("body: ",body)}
      <main
        id='react-mount'
        dangerouslySetInnerHTML={{__html: body}}
      />
      <script
        src='/bundle.js'
      />
    </body>
  </html>
)

HTML.displayName = 'HTML - Server Side Render'
export default HTML
