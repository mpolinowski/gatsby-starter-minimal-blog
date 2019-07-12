const _ = require('lodash')
const path = require("path")

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  let slug

  if (node.internal.type === 'Mdx') {
    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`
    } else if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`
    }
    createNodeField({ node, name: 'slug', value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { createRedirect } = actions

  createRedirect({
    fromPath: `/first-openshift3-cluster/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/setting-up-an-okd-cluster`,
  })

  createRedirect({
    fromPath: `/installing-openshift-3-on-centos-7/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/red-hat-open-shift-3-container-platform`,
  })

  createRedirect({
    fromPath: `/nginx-ingress-cert-manager/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/nginx-ingress-with-cert-manager`,
  })

  createRedirect({
    fromPath: `/kubernetes-cluster-logging/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/kubernetes-cluster-monitoring-logging`,
  })

  createRedirect({
    fromPath: `/creating-a-grafana-dashboard/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/sensors-data-and-grafana`,
  })

  createRedirect({
    fromPath: `/zigbee2mqtt-xiaomi-fhem/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/zigbee-sensors-in-fhem`,
  })

  createRedirect({
    fromPath: `/red-hat-containerized-application-development-rhcs/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/red-hat-certified-specialist-in-containerized-application-development`,
  })

  createRedirect({
    fromPath: `/nodered-dashboard-getting-started/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/creating-node-red-admin-panel-using-node-red-dashboard`,
  })

  createRedirect({
    fromPath: `/nodered-http-connect/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/node-red-interaction-over-http`,
  })

  createRedirect({
    fromPath: `/nodered-mqtt-connect/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/a-collection-of-node-red-mqtt-recipes`,
  })

  createRedirect({
    fromPath: `/nodered-sqlite/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/using-sq-lite-with-node-red-on-windows`,
  })

  createRedirect({
    fromPath: `/postgresql-getting-started/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/getting-started-with-postgre-sql-in-windows-10`,
  })

  createRedirect({
    fromPath: `/nodered-cryptocurrency-dashboard/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/creating-a-dashboard-displaying-cryptocurrency-data-using-node-red`,
  })

  createRedirect({
    fromPath: `/openhab2-mqtt-nodered/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/home-automation-and-ip-cameras`,
  })

  createRedirect({
    fromPath: `/nodered-getting-started/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/getting-started-with-node-red-windows-10-edition`,
  })

  createRedirect({
    fromPath: `/red-hat-certified-engineer-rhce/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/red-hat-certified-engineer-rhce-exam`,
  })

  createRedirect({
    fromPath: `/express-generator-dockerrized/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/how-to-wrap-your-source-code-into-a-docker-container`,
  })

  createRedirect({
    fromPath: `/node-express-docker-container/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/run-your-node-js-app-from-a-docker-container`,
  })

  createRedirect({
    fromPath: `/express-generator-app-docker/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/link-your-node-source-code-into-a-docker-container`,
  })

  createRedirect({
    fromPath: `/server-side-render-react-router/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/server-rendering-with-react-and-react-router`,
  })

  createRedirect({
    fromPath: `/react-transition-group-demo/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/react-transition-group`,
  })

  createRedirect({
    fromPath: `/gatsby-material-ui-starter/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/gatsby-material-ui-starter`,
  })

  createRedirect({
    fromPath: `/machine-learning-with-python/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/machine-learning-with-sci-kit-learn`,
  })

  createRedirect({
    fromPath: `/securing-elasticsearch-readonlyrest/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/securing-elasticsearch-with-read-only-rest`,
  })

  createRedirect({
    fromPath: `/securing-elasticsearch-xpack/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/securing-elasticsearch-with-x-pack`,
  })

  createRedirect({
    fromPath: `/nginx-node-security/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/nginx-node-js-security`,
  })

  createRedirect({
    fromPath: `/elasticsearch-kibana/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/elasticsearch-and-kibana`,
  })

  createRedirect({
    fromPath: `/umlaute-on-us-keyboard/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/umlaute`,
  })

  createRedirect({
    fromPath: `/python-ssh-logger/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/python-network-logger`,
  })

  createRedirect({
    fromPath: `/gatsby-reactstrap/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/gatsby-js-with-bootstrap-4`,
  })

  createRedirect({
    fromPath: `/gatsby-wiki/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/gatsby-js-knowledgebase`,
  })

  createRedirect({
    fromPath: `/next-start/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/next-js-server-side-rendering`,
  })

  createRedirect({
    fromPath: `/elasticsearch-react-example/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/react-search-interface`,
  })

  createRedirect({
    fromPath: `/developing-software-in-china/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/proxima-centauri`,
  })

  createRedirect({
    fromPath: `/reactive-material/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/create-react-app-and-material-ui`,
  })

  createRedirect({
    fromPath: `/google-analytics-amp/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/google-analytics`,
  })

  createRedirect({
    fromPath: `/caloric-burn/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/food-caloric-table-app`,
  })

  createRedirect({
    fromPath: `/windows10-control/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/windows-control`,
  })

  createRedirect({
    fromPath: `/node-express-static-wiki/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/node-express-static`,
  })

  createRedirect({
    fromPath: `/node-express-mongodb/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/node-express-with-mongo-db`,
  })

  createRedirect({
    fromPath: `/javascript-apis-and-ajax/`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/java-script-and-getting-started-with-ap-is-and-ajax`,
  })

  const postTemplate = require.resolve('./src/templates/post.jsx')
  const categoryTemplate = require.resolve('./src/templates/category.jsx')

  const result = await wrapper(
    graphql(`
      {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
              categories
            }
          }
        }
      }
    `)
  )

  const posts = result.data.allMdx.nodes

  posts.forEach((n, index) => {
    const next = index === 0 ? null : posts[index - 1]
    const prev = index === posts.length - 1 ? null : posts[index + 1]

    createPage({
      path: n.fields.slug,
      component: postTemplate,
      context: {
        slug: n.fields.slug,
        prev,
        next,
      },
    })
  })

  const categorySet = new Set()

  _.each(posts, n => {
    if (_.get(n, 'frontmatter.categories')) {
      n.frontmatter.categories.forEach(cat => {
        categorySet.add(cat)
      })
    }
  })

  const categories = Array.from(categorySet)

  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })
}
