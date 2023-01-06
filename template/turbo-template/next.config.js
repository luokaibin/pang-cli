const path = require('path');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-with-less')
const seo404 = require('@lib/scripts/seo_404');
const sitemap = require('@lib/scripts/sitemap');
const withTM = require('next-transpile-modules')(
  ['react-native-tab-view',
    'react-native-web',
    'react-native-web-refresh-control',
    'react-content-loader',
    "@kiki/web.ui.airdrop-userinfo",
    "@constants",
    "@api",
    "@images",
    "@lib",
    "projectapp",
    "@type",
    "@store",
    "@utils",
    "@styles",
    "@widget",
    "@components",
    '@kikitrade/api-gateway-client']);
// You can choose which headers to add to the list
// after learning more below.
//
// const ContentSecurityPolicy = `
//    style-src 'self';
//    font-src 'self';
//  `
const securityHeaders = [
  // This can prevent against clickjacking attacks
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }
]
const withPWA = require('next-pwa')({
  dest: 'public',
  buildExcludes: [/media\/.*\.webp$/]

})

module.exports = withPlugins([
  withTM,
  withPWA
], {
  basePath: '/airdrop',
  experimental: {
    outputStandalone: true,
    esmExternals: "loose"
  },
  productionBrowserSourceMaps: true,
  outputFileTracing: false,
  compiler: {
    removeConsole: true
  },
  images: {
    domains: [
      'upload.dipbit.xyz',
      'upload.kikitrade.com',
      'kiki-beta.oss-ap-southeast-1.aliyuncs.com',
      'kiki-prod.oss-ap-southeast-1.aliyuncs.com'],
    formats: ['image/avif', 'image/webp']
  },
  i18n: {
    locales: ['en', 'zh-CN', 'zh-HK', 'zh-TW', 'zh-TC'],
    defaultLocale: 'en',
    localeDetection: true
  },
  eslint: {
    // Only run ESLint on the 'pages' and
    // 'utils' directories during production builds (next build)
    dirs: ['src']
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*{/}?', // Matches all pages
        headers: securityHeaders
      },
      {
        source: '/_next/:path*',
        headers: [
          { key: 'test', value: 'aaa' }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/newapi/:path*',
        destination: 'https://api.beta.dipbit.xyz/:path*'
      },
      {
        source: '/api/:path*',
        destination: 'http://api.dipbit.xyz:8193/:path*'
        // destination: 'https://newapi.beta.dipbit.xyz/:path*'
      },
      // {
      //   source: '/short_link/:path*',
      //   destination: 'https://s.dipbit.xyz/:path*'
      // },
      {
        source: '/oss_upload_beta/:path*',
        destination: 'http://kiki-beta.oss-ap-southeast-1.aliyuncs.com/:path*'
      },
      {
        source: '/oss_upload_prod/:path*',
        destination: 'http://kiki-prod.oss-ap-southeast-1.aliyuncs.com/:path*'
      },
      {
        source: '/dev_newapi/:path*',
        destination: 'http://api.dev.dipbit.xyz/:path*'
      },
      {
        source: '/dev_api/:path*',
        destination: 'https://newapi.dev.dipbit.xyz/:path*'
      },
      {
        source: '/pro_newapi/:path*',
        destination: 'https://api.kikitrade.com/:path*'
      },
      {
        source: '/pro_api/:path*',
        destination: 'https://newapi.kikitrade.com/:path*'
      },
      {
        source: '/new/locale/:path*',
        destination: 'https://m.kikitrade.com/:path*'
      },
      {
        source: '/website/:path*',
        destination: 'https://m.dipbit.xyz/:path*'
      },
      {
        source: '/short_link/:path*',
        destination: 'https://s.dipbit.xyz/:path*'
      }
    ]
      .concat(sitemap)
  },
  async redirects() {
    return [
      {
        source: '/zh-HK',
        destination: '/zh-TC',
        locale: false,
        permanent: false
      },
      {
        source: '/zh-TW',
        destination: '/zh-TC',
        locale: false,
        permanent: false
      }
    ]
      .concat(seo404)
  },
  webpack: (conf) => {
    const config = withLess(conf);
    config.module.rules.push({
      test: /\.svg$/i,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            icon: true,
          }
        }
      ]
    })
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native`
      // imports to `react-native-web`
      'react-native$': 'react-native-web',
      'react-native-fast-image': path.resolve(
        __dirname,
        './rn-web/fastImage_web'
      )
    }

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions
    ]
    return config
  }
})
