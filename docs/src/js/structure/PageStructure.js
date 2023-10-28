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
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgb(24, 32, 44)',
        },
      },
    },
  },
});

const drawerWidth = 256;
const DivRoot = styled('div')({
  display: 'flex',
  minHeight: '100vh',
})
const NavDrawer = styled('nav')({
  [theme.breakpoints.up('sm')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
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

function PageStructure(props) {
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
            sx={{ display: { sm: 'none', xs: 'block' }}}
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
          />
        </NavDrawer>
        <DivApp>
          <Header onDrawerToggle={handleDrawerToggle} />
          <MainMain>
            <Content contents={props.contents} use_wrapper={props.use_wrapper} />
          </MainMain>
          <FooterFooter>
            <Copyright />
          </FooterFooter>
        </DivApp>
      </DivRoot>
    </ThemeProvider>
  );
};

export default PageStructure;