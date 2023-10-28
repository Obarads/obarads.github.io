import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// material design
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/system';

// icons
import GitHubIcon from '@mui/icons-material/GitHub';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HomeIcon from '@mui/icons-material/Home';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const MenuIconButton = styled(IconButton)({
  marginLeft: 12,
  color: 'inherit',
});
const LinkList = styled(Link)({
  textDecoration: 'none',
  color: lightColor,
  '&:hover': {
    color: 'white',
  },
  paddingRight: 10
});
const ALink = styled('a')({
textDecoration: 'none',
  color: lightColor,
  '&:hover': {
    color: 'white',
  },
  paddingRight: 10
});
const TopAppBar = styled(AppBar)({
  backgroundColor: "rgb(24, 32, 44)"
});


function Header(props) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <TopAppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{display: {sm:'none', xs: 'block'}}} item>
              <Grid item>
                <MenuIconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </MenuIconButton>
              </Grid>
            </Grid>
            <Grid item xs />
            <Grid item>
              <LinkList to="/">
                <HomeIcon />
              </LinkList>
            </Grid>
            <Grid item>
              <LinkList to="/papers">
                <FindInPageIcon />
              </LinkList>
            </Grid>
            <Grid item>
              <ALink href="https://github.com/Obarads/obarads.github.io">
                <GitHubIcon />
              </ALink>
            </Grid>
          </Grid>
        </Toolbar>
      </TopAppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
