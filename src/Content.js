import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  contentWrapper: {
    margin: '20px 16px',
  },
});

function Content(props) {
  const { classes } = props;
  let use_wrapper = props.use_wrapper;
  if(use_wrapper === undefined){use_wrapper = true;}

  if (use_wrapper) {
    return (
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          {props.contents}
        </div>
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.paper}>
        {props.contents}
      </Paper>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
