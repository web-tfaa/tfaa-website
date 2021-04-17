// External Dependencies
import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import EnhancedAlert from '../EnhancedAlert';

// Local Variables
const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    boxShadow: 'rgba(25, 17, 34, 0.05) 0px 3px 10px',
    marginBottom: '1em',
    padding: '2em 3em',
    textAlign: 'left',
  },
});

// Component Definition
const SponsorCardAlertOnly = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EnhancedAlert title="Sponsorship Opportunities">
        More info to come on sponsorship opportunities for the 2021-22 fiscal year.
      </EnhancedAlert>
    </div>
  );
};

export default SponsorCardAlertOnly;
