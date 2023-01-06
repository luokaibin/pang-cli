import '@lib/scripts/wdyr'
import '@utils/firebase'
import '@utils/bugsnag'
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en-au';
import 'dayjs/locale/zh-hk';

import * as React from 'react'
import { useEffect } from 'react'

import { ConfigProvider } from 'antd';
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc';
import { Provider } from 'mobx-react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { DARK_FOOTER_PAGE, INVITATION_FOOTER_PAGE, NOT_FOOTER_PAGE } from '@constants/index';
import { getPageHeader } from '@utils/getPageHeader';
import { PageFooter } from '@widget/home/FooterNav'

import { useStore } from '@store'
import * as gtag from '@utils/gtag'
import I18n from '@utils/i18n'

// import Layout from '../components/Layout'
import 'antd/dist/antd.css';
import '@styles/common/app.css';

const H5DownLoad = dynamic(
  () => import('@components/H5DownLoad'),
  { ssr: false }
)

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);

dayjs.extend(utc)

// const ROUTES_TO_RETAIN = ['/']

export function reportWebVitals ({ id, name, label, value }) {
  // console.log({ id, name, label, value })
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  if (window.gtag) {
    // console.log({ id, name, label, value })
    window.gtag('event', name, {
      event_category:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true // avoids affecting bounce rate.
    })
  }
}

export default function MyApp ({ Component, pageProps }) {
  const router = useRouter()

  if (router.locale === 'zh-TC') {
    dayjs.locale('zh-hk')
  }
  if (router.locale === 'zh-CN') {
    dayjs.locale('zh-cn')
  }
  if (!router.locale || router.locale === 'en') {
    dayjs.locale('en')
  }

  I18n.mergeRemoteLocale(router.locale === 'zh-TC' ? 'hk' : (router.locale === 'zh-CN' ? 'zh' : 'en'))
  I18n.updateLocale(router.locale)

  pageProps.locale = router.locale
  pageProps.locales = router.locales
  pageProps.route = router.route
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  const store = useStore(pageProps.initialState)
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Save scroll position - requires an up-to-date router.asPath
  // useEffect(() => {
  //   router.events.on('routeChangeStart', handleRouteChangeStart)
  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChangeStart)
  //   }
  // }, [router.asPath])

  // Scroll to the saved position when we load a retained component
  // useEffect(() => {
  //   if (isRetainableRoute) {
  //     window.scrollTo(0, retainedComponents.current[router.asPath].scrollPos)
  //   }
  // }, [Component, pageProps])

  return getLayout(
    <Provider store={store} locale={pageProps.locale}>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
      <Head>
        {getPageHeader({ pathname: router.route, locale: router.locale })}
      </Head>
      <ConfigProvider autoInsertSpaceInButton={false}>
        <Component {...pageProps} />
        {![...DARK_FOOTER_PAGE,
          ...NOT_FOOTER_PAGE,
          ...INVITATION_FOOTER_PAGE
        ].includes(router.route) && <PageFooter theme="grey" />}
        <H5DownLoad />
      </ConfigProvider>
    </Provider>
  )
}
