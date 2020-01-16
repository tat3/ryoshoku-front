import { red, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef6c00'
    },
    secondary: {
      main: '#0083ef',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[100],
    },
  },
});

export default theme;
