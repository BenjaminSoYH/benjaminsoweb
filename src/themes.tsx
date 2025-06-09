export const theme = {
  colors: {
    background: 'rgba(240, 244, 255, 0.6)', // light gray-blue
    primary: 'rgba(30, 60, 90, 1)',          // deep blue
    secondary: '#90caf9',                   // light blue
    text: '#1a1a1a',                         // dark gray for readability
    border: 'rgba(30, 60, 90, 0.2)',         // soft blue-gray
  }, 
  shadows: {
    soft: '0 0 0.3em 0.3em rgba(224, 238, 255, 0.52)',
    medium: '0 0 0.3em 0.3em rgba(148, 168, 229, 0.59)',
    primary: '0 0 0.3em 0.3em rgba(49, 76, 103, 0.33)',
  },
  borders: {
    default: '2px solid rgba(61, 97, 133, 0.8)', // light blue-gray
    primary: '0.125em solid rgba(30, 60, 90, 0.6)',  // blue
    secondary: '0.0625em solid #90caf9',            // light blue
  },
  radius: {
    default: '0.75em',
    full: '10em',
  },
};

export const boxDefault: React.CSSProperties = {
  // backgroundColor: theme.colors.background,
  border: theme.borders.secondary,
  boxShadow: theme.shadows.medium,
  borderRadius: theme.radius.default,
  padding: '1em',
  color: theme.colors.text,
};
