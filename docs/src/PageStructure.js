import React from 'react';
// import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

// container
import Navigator from './Navigator';
import Content from './Content';
import Header from './Header';
import useMediaQuery from '@mui/material/useMediaQuery';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Obarads
      </Link>{' '}
      2019 - {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

const drawerWidth = 256;

const DivRoot = styled('div')({
  display: 'flex',
  minHeight: '100vh',
})
const NavDrawer = styled('nav')({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  }
})
const DivApp = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
})
const MainMain = styled('main')({
  flex: 1,
  padding: theme.spacing(2, 4),
  background: '#eaeff1',
})
const FooterFooter = styled('footer')({
  padding: theme.spacing(2),
  background: '#eaeff1',
})
function Hidden(contents) {
  const sm_match = useMediaQuery(theme => theme.breakpoints.up('sm'));
  return
}
// PageStructure.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// PageStruecture classes by with styles: root, drawer, app, main, footer
export default function PageStructure(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <DivRoot>
        <CssBaseline />
        <NavDrawer>
          <Navigator
            sx={{ display: { sm: 'none', xs: 'block' } }}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            contents={props.navigator}
          />
          <Navigator
            sx={{ display: { sm: 'block', xs: 'none' } }}
            PaperProps={{ style: { width: drawerWidth } }}
            contents={props.navigator}
          /></NavDrawer>
        <DivApp>
          <Header onDrawerToggle={handleDrawerToggle} />
          <MainMain>
            {/* <Content contents={props.contents} use_wrapper={props.use_wrapper} /> */}
          </MainMain>
          <FooterFooter>
            <Copyright />
          </FooterFooter>
        </DivApp>
      </DivRoot>
    </ThemeProvider>
  );
};
