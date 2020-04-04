module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: '| Mike Polinowski | | DevNotes |', // Navigation and Site Title
  siteTitleAlt: 'Mike Polinowski', // Alternative Site title for SEO
  siteTitleManifest: '::Mike::Polinowski::',
  siteUrl: 'https://mpolinowski.github.io', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteHeadline: 'Mike Polinowski\'s Developer Notebook', // Headline for schema.org JSONLD
  siteBanner: '/assets/images/angular_momentum.png', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/assets/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'A Developer Notebook and Personal Technology Playground build with React, Gatsby and MDX', // Your site description
  author: 'Mike Polinowski', // Author for schemaORGJSONLD
  siteLogo: '/social/logo.png', // Image for schemaORGJSONLD

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@minimal', // Twitter Username - Optional
  ogSiteName: 'minimal', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language
  googleAnalyticsID: 'UA-76200392-4',

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#25ad71',
  backgroundColor: '#2b2e3c',
}
