import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { AppRegistry } from 'react-native'
import config from '../../app.json'
import { GTMId } from '@constants/index'
// import pick from 'lodash/pick';
// import { getPageHeader } from '@utils/getPageHeader';
// Force Next-generated DOM elements
// to fill their parent's height

// 解决页面内容无法撑开
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
`

const viewport = [
  'width=device-width',
  'initial-scale=1.0',
  'minimum-scale=1.0',
  'maximum-scale=1.0',
  'user-scalable=no'
]
export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage, ...rest }) {
    AppRegistry.registerComponent(config.name, () => Main)
    const { getStyleElement } = AppRegistry.getApplication(config.name)
    const page = await renderPage()
    // console.log(rest, 'restrestrest')
    const styles = [
      <script key="76348" async src='/ua-parser.js' />,
      <link key='icon'
        rel="shortcut icon"
        href="/favicon.png"
        type="image/x-icon" />,
      // <script key="57348" async src='/gtm.js' />,
      <script key="57348" dangerouslySetInnerHTML={{
        __html: `
          (function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
              'gtm.start':
          new Date().getTime(),
              event: 'gtm.js'
            }); const f = d.getElementsByTagName(s)[0];
            const j = d.createElement(s); 
            const dl = l !== 'dataLayer' ? '&l=' + l : ''; 
            j.async = true; 
            j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; 
          f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', '${GTMId}');
        `
      }} />,

      <meta
        key="376"
        name="viewport"
        content={viewport.join(',')}
        />,
      <style
        key={config.name}
        dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
      getStyleElement()
    ]
    return { ...page, styles: Children.toArray(styles) }
  }

  render () {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          {/* test google search console */}
          <meta
            name="google-site-verification"
            content="r_-yKT8a48EoEfpiP6f1kAnBamwcUyRHylBAA5QfeOE" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"/>
          <meta name="theme-color" content="#fff" />
        </Head>
        <body style={{ height: '100%' }}>
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTMId}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
