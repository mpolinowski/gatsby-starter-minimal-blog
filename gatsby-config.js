const config = require('./config')

const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

module.exports = {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            resolve: `gatsby-remark-images-without-bg`,
              options: {
                maxWidth: 1024,
                quality: 90,
                withWebp: true,
                tracedSVG: true,
                linkImagesToOriginal: false,
               },
          },
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     maxWidth: 800,
          //     backgroundColor: "transparent",
          //     wrapperStyle: 'display: none',
          //     quality: 90,
          //     withWebp: true,
          //     linkImagesToOriginal: false,
          //     tracedSVG: true,
          //   },
          // },
          // TODO: Replace with "mdx-component-autolink-headers"
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitleAlt,
        short_name: config.siteTitleManifest,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: config.favicon,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [``, `/categories/`, `/curriculum-vitae/`],
        navigateFallback: `/offline-plugin-app-shell-fallback/index.html`,
        // Only match URLs without extensions or the query `no-cache=1`.
        // So example.com/about/ will pass but
        // example.com/about/?no-cache=1 and
        // example.com/cheeseburger.jpg will not.
        // We only want the service worker to handle our "clean"
        // URLs and not any files hosted on the site.
        //
        // Regex based on http://stackoverflow.com/a/18017805
        navigateFallbackWhitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
        navigateFallbackBlacklist: [/\?(.+&)?no-cache=1$/],
        cacheId: `gatsby-plugin-offline`,
        // Don't cache-bust JS or CSS files, and anything in the static directory,
        // since these files have unique URLs and their contents will never change
        dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
        runtimeCaching: [
          {
            // Use cacheFirst since these don't need to be revalidated (same RegExp
            // and same reason as above)
            urlPattern: /(\.js$|\.css$|static\/)/,
            handler: `CacheFirst`,
          },
          {
            // page-data.json files are not content hashed
            urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
            handler: `NetworkFirst`,
          },
          {
            // Add runtime caching of various page resources.
            urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
            handler: `staleWhileRevalidate`,
          },
        ],
        skipWaiting: true,
        clientsClaim: true,
      }
    }
  ],
}
