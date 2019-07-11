import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

const Wrapper = styled.header`
  background: linear-gradient(
    45deg,
    ${props => darken(0.1, props.theme.colors.primary)},
    ${props => lighten(0.1, props.theme.colors.primary)}
  );
  grid-column: 1 / -1;
  margin-left: -1rem;
  margin-right: -1rem;
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      padding: 1rem 2rem 4rem 2rem;
      }
  padding: 1rem 2rem 4.5rem 2rem;
  box-shadow: inset 0px -10px 30px 0px rgba(0, 0, 0, 0.1);
`

const Content = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  font-size: 1.3rem;
  line-height: 1.58;
  font-weight: bold;
  font-family: 'Bitter',-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Helvetica','Arial',serif;
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    font-size: 1rem;
    }

  a {
    color: ${props => props.theme.colors.white};
    font-size: 1.2rem;
    &:hover {
      opacity: 0.85;
      color: ${props => props.theme.colors.white};
    }
  }
`

const Header = ({ children }) => (
  <Wrapper>
    <Content>{children}</Content>
  </Wrapper>
)

export default Header

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
}
