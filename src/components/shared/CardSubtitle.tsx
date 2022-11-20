// External Dependencies
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';

// Internal Dependencies
import { options } from '../../utils/typography';

// Local Variables
const useStyles = makeStyles({
  subtitle: {
    fontFamily: options.headerFontFamily.join(','),
    fontWeight: 600,
  },
});

// Component Definition
const CardSubtitle: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography
      className={classes.subtitle}
      component="h3"
    >
      {children}
    </Typography>
  );
};

export default CardSubtitle;
