// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

// Local Variables
const propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    content: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired,
  }).isRequired,
  hideTransition: PropTypes.bool,
  show: PropTypes.bool,
};

const defaultProps = {
  children: null,
  hideTransition: false,
  show: false,
};

const styles = {
  content: {
    // backgroundColor: theme.palette.grey['50'],
    // borderLeft: `solid 1px ${theme.palette.grey['300']}`,
    // height: '100%',
    // paddingRight: 2,
    // position: 'absolute',
    // top: 0,
    // whiteSpace: 'nowrap',
  },
  root: {
    position: 'relative',
    width: 0,
  },
};

// Component Definition
const ActionDrawer = ({
  children,
  classes,
  show,
}) => (
  <td className={classes.root}>
    <Slide
      direction="right"
      in={show}
      className={classes.content}
    >
      {children}
    </Slide>
  </td>
);

ActionDrawer.propTypes = propTypes;
ActionDrawer.defaultProps = defaultProps;

export default withStyles(styles)(ActionDrawer);
