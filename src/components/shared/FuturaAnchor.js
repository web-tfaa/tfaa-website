// Internal Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import { options } from '../../utils/typography';

// Local Variables
const propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: options.headerFontFamily.join(','),
    marginBottom: theme.spacing(2),
  },
}));

// Component Definition
const FuturaAnchor = ({ children, href, ...props }) => {
  const classes = useStyles();
  return (
    <a
      {...props}
      className={classes.root}
      href={href}
    >
      {children}
    </a>
  );
};

FuturaAnchor.propTypes = propTypes;

export default FuturaAnchor;
