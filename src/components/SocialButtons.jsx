import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import cv from '../assets/cv.png'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
import twitter from '../assets/twitter.png'
import flickr from '../assets/flickr.png'

const CategoriesButton = styled.button`
  background: ${props => props.theme.colors.primary};
  border: none;
  display: inline-flex;
  align-items: center;
  border-radius: ${props => (props.big ? '.2rem' : '1rem')};
  font-size: ${props => (props.big ? '1.2rem' : '1rem')};
  color: ${props => props.theme.colors.white};
  padding: ${props => (props.big ? '0.6rem 1.76rem' : '0.35rem 1.65rem')};
  margin-right: 25px;
  transition: all ${props => props.theme.transitions.normal};
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  &:hover {
    background: ${props => props.theme.colors.primaryLight};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`

const CvButton = styled.button`
  background-image: url(${cv});
  background-color: ${props => props.theme.colors.primary};
  width: 45px;
  height: 45px;
  margin-right: 7px;
  background-size: contain;
  transition: all ${props => props.theme.transitions.normal};
  border-radius: .2rem;
  border: none;
  padding: -2px;
  color: ${props => props.theme.colors.white};
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`

const GithubButton = styled.button`
  background-image: url(${github});
  background-color: ${props => props.theme.colors.primary};
  width: 45px;
  height: 45px;
  margin-right: 7px;
  background-size: contain;
  transition: all ${props => props.theme.transitions.normal};
  border-radius: .2rem;
  border: none;
  padding: -2px;
  color: ${props => props.theme.colors.white};
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`

const LinkedinButton = styled.button`
  background-image: url(${linkedin});
  background-color: ${props => props.theme.colors.primary};
  width: 45px;
  height: 45px;
  margin-right: 7px;
  background-size: contain;
  transition: all ${props => props.theme.transitions.normal};
  border-radius: .2rem;
  border: none;
  padding: -2px;
  color: ${props => props.theme.colors.white};
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`

const TwitterButton = styled.button`
  background: #1a8f6e;
  background-image: url(${twitter});
  background-color: ${props => props.theme.colors.primary};
  width: 45px;
  height: 45px;
  margin-right: 7px;
  background-size: contain;
  transition: all ${props => props.theme.transitions.normal};
  border-radius: .2rem;
  border: none;
  padding: -2px;
  color: ${props => props.theme.colors.white};
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`

const FlickrButton = styled.button`
  background: #1a8f6e;
  background-image: url(${flickr});
  background-color: ${props => props.theme.colors.primary};
  width: 45px;
  height: 45px;
  margin-right: 7px;
  background-size: contain;
  transition: all ${props => props.theme.transitions.normal};
  border-radius: .2rem;
  border: none;
  padding: -2px;
  color: ${props => props.theme.colors.white};
  &:hover {
    background-color: ${props => props.theme.colors.primaryLight};
    cursor: pointer;
    transform: translateY(-2px);
  }
  &:focus {
    outline: none;
  }
`

const Wrapper = styled.section`
  display: inline-flex;
  align-items: right;
`;

const SocialButtons = () => (
  <Wrapper>
    <Link to="/categories/">
      <CategoriesButton big>
        Categories
      </CategoriesButton>
    </Link>
    <Link to="/curriculum-vitae/">
      <CvButton/>
    </Link>
    <a href="https://github.com/mpolinowski" target="_blank" rel="noopener noreferrer">
      <GithubButton/>
    </a>
    <a href="https://www.linkedin.com/in/mike-polinowski-6396ba121/" target="_blank" rel="noopener noreferrer">
      <LinkedinButton/>
    </a>
    <a href="https://www.flickr.com/people/149680084@N06/" target="_blank" rel="noopener noreferrer">
      <FlickrButton/>
    </a>
    <a href="https://twitter.com/MikePolinowski" target="_blank" rel="noopener noreferrer">
      <TwitterButton/>
    </a>
  </Wrapper>
)

export default SocialButtons
