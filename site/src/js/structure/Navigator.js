import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function Navigator(props) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{fontSize: 24, color: 'white'}}>
          Note board
        </ListItem>
        {props.contents}
      </List>
    </Drawer>
  );
}

export default Navigator;
