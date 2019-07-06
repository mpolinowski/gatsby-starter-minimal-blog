import { lighten } from 'polished'

const colors = {
  primary: '#1a8f6e', // Color for buttons or links
  primaryLight: lighten(0.05, '#1a8f6e'),
  bg: '#24292e', // Background color
  article: '#31363f',
  grey: {
    dark: 'rgba(0, 0, 0, 0.9)',
    default: 'rgba(0, 0, 0, 0.7)',
    light: 'rgba(0, 0, 0, 0.15)',
    ultraLight: '#ededed',
  },
  link: '#FFC107',
  white: 'white',
}

const transitions = {
  normal: '0.5s',
}

const fontSize = {
  small: '0.9rem',
}

const fontFamily = {
  serif: `'Bitter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', serif`,
  sansSerif: `'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
}

const breakpoints = {
  tablet: '1200px',
  phone: '600px',
}

const theme = {
  colors,
  transitions,
  fontSize,
  breakpoints,
  fontFamily,
  maxWidth: '1000px',
  baseFontSize: '18px',
}

export default theme
