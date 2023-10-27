import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { styled } from '@mui/system'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// const styles = (theme) => ({
//   item: {
//     paddingTop: 1,
//     paddingBottom: 1,
//     color: 'rgba(255, 255, 255, 0.7)',
//     '&:hover,&:focus': {
//       backgroundColor: 'rgba(255, 255, 255, 0.08)',
//     },
//   },
//   itemCategory: {
//     backgroundColor: '#rgb(24, 32, 44)',
//     // boxShadow: '0 -1px 0 #404854 inset',
//     paddingTop: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   firebase: {
//     fontSize: 24,
//     color: theme.palette.common.white,
//   },
// });

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem>
          Note board
        </ListItem>
        {props.contents}
      </List>
    </Drawer>
  );
}

// Navigator.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default Navigator;
