const SITE_MAP_URL = 'https://www.kikitrade.com';
// const SITE_MAP_URL = 'https://kikitrade-preview.vercel.app';

module.exports = {
  siteUrl: SITE_MAP_URL,
  // 生成一个robots.txt文件并列出生成的站点地图。默认falses
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-zh.xml', '/server-sitemap-hk.xml', '/server-sitemap-topics.xml', '/server-sitemap-market.xml'],
  // optional
  alternateRefs: [
    {
      href: SITE_MAP_URL,
      hreflang: 'x-default'
    },
    {
      href: SITE_MAP_URL,
      hreflang: 'en'
    },
    {
      href: `${SITE_MAP_URL}/zh-CN`,
      hreflang: 'zh-CN'
    },
    {
      href: `${SITE_MAP_URL}/zh-TC`,
      hreflang: 'zh-TC'
    }
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/*/wallet'] },
      { userAgent: 'Googlebot', disallow: ['/*/wallet'] }
    ],
    additionalSitemaps: [
      `${SITE_MAP_URL}/server-sitemap-zh.xml`,
      `${SITE_MAP_URL}/server-sitemap-hk.xml`,
      `${SITE_MAP_URL}/server-sitemap-topics.xml`,
      `${SITE_MAP_URL}/server-sitemap-market.xml`
    ]
  }
}
