import React from 'react'
import PropTypes from 'prop-types'
import siteConfig from '../../../../config/cvSiteConfig'
import { ResetCSS, GlobalStyle } from '../styles'
// import Header from '../../Header'
import Header from '../header'

const Layout = ({ children }) => (
  <React.Fragment>
    <Header headerLinks={siteConfig.headerLinks} />
    <ResetCSS />
    <GlobalStyle />
    <div>{children}</div>
  </React.Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
