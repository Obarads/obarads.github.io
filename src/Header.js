import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// material design
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

// icons
import GitHubIcon from '@material-ui/icons/GitHub';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import HomeIcon from '@material-ui/icons/Home';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
    paddingRight: 10
  },
  button: {
    borderColor: lightColor,
  },
  barColor: {
    backgroundColor: "rgb(24, 32, 44)"
  }
});



function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0} className={classes.barColor}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} to="/">
                <HomeIcon />
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to="/papers">
                <FindInPageIcon />
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} href="https://github.com/Obarads/obarads.github.io">
                <GitHubIcon />
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
