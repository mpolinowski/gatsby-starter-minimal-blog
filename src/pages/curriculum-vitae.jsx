import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-awesome-styled-grid'
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa"
import cvSiteConfig from '../../config/cvSiteConfig'

import Layout from '../components/cv/layout'
import Hero from '../components/cv/hero'
import Wrapper from '../components/cv/wrapper'
import About from '../components/cv/about'
import Skills from '../components/cv/skills'
import Timeline from '../components/cv/timeline'
import Repositories from '../components/cv/repositories'

const Separator = styled.hr`
  margin-top: 24px;
  margin-bottom: 16px;
`

class Home extends React.Component {
  render () {

    const title = cvSiteConfig.siteTitle
    const {keywords} = cvSiteConfig
    return (
      <Layout location={this.props.location}>

        <Hero
          heroImg={cvSiteConfig.siteCover}
          title={title}
        />

        <Wrapper className={this.props.className} >
          <Container className="page-content" fluid>
            <Row>
              <Col xs={4} className='avatar'>
                <img
                  className='avatar__image'
                  src='/assets/images/angular_momentum.png'
                  alt='user avatar'
                />
                <div className="social">
                  {cvSiteConfig.social.github && <a className="social-link github" href={cvSiteConfig.social.github}>
                    <FaGithub className="social-icon" size="32" />
                  </a>}
                  {cvSiteConfig.social.linkedin && <a className="social-link linkedin" href={cvSiteConfig.social.linkedin}>
                    <FaLinkedin className="social-icon" size="32" />
                  </a>}
                  {cvSiteConfig.social.twitter && <a className="social-link twitter" href={cvSiteConfig.social.twitter}>
                    <FaTwitter className="social-icon" size="32" />
                  </a>}
                  {cvSiteConfig.social.email && <a className="social-link email" href={`mailto:${cvSiteConfig.social.email}`}>
                    <FaEnvelope className="social-icon" size="32" />
                  </a>}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4} sm={4}>
                <About title='About' text={cvSiteConfig.authorDescription}/>
              </Col>
              <Col xs={4} sm={4}>
                <Skills title='Skills' skills={cvSiteConfig.skills} />
              </Col>
            </Row>
            <Separator />
            <Timeline />
            <Separator />
            <Repositories />
          </Container>
        </Wrapper>
      </Layout>
    )
  }
}

export default styled(Home)`
  .page-content {
    max-width: 100%;
    margin-bottom: 40px;
  }

  .avatar {
    align-items: center;
    margin-bottom: 24px;
    flex-direction: column;
  }

  .avatar__image {
    box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.75);
    max-width: 200px;
    /* border-radius: 100px; */
    margin: 0 auto 24px;
  }

  .social {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .social-link {
    padding: 8px;
    color: #424242;
  }

  a.social-link.twitter:hover {
    color: #1da1f2;
  }

  a.social-link.github:hover {
    color: #24292e;
  }

  a.social-link.linkedin:hover {
    color: #0077B5;
  }

  a.social-link.email:hover {
    color: #c23a2b;
  }
`
