// External Dependencies
import clsx from 'clsx';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MuiCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles';

// Local Variables
const INFO = 'info';
const WARNING = 'warning';

const propTypes = {
  bodyText: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  rootClasses: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf([INFO, WARNING]).isRequired,
};

const defaultProps = {
  rootClasses: '',
  title: '',
};

const useStyles = makeStyles((theme) => ({
  content: {
    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  iconSmall: {
    height: 24,
    width: 24,
  },
  info: {
    borderLeft: `4px solid ${theme.palette.alert.info}`,
  },
  root: {
    maxWidth: '75%',
  },
  warning: {
    borderLeft: `4px solid ${theme.palette.alert.warning}`,
  },
}));

// Component Definition
const Alert = ({
  bodyText,
  fullWidth,
  rootClasses,
  title,
  type,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  let iconElement;
  if (type === INFO) {
    iconElement = (
      <InfoOutlinedIcon
        className={clsx(classes.icon, !title && classes.iconSmall)}
        htmlColor={theme.palette.alert.info}
      />
    );
  } else if (type === WARNING) {
    iconElement = (
      <ReportProblemOutlinedIcon
        className={clsx(classes.icon, !title && classes.iconSmall)}
        htmlColor={theme.palette.alert.warning}
      />
    );
  }

  return (
    <MuiCard
      className={clsx(
        !fullWidth && classes.root,
        type === INFO && classes.info,
        type === WARNING && classes.warning,
        rootClasses,
      )}
    >
      <CardContent className={classes.content}>
        {iconElement}
        <div>
          {title && (
            <Typography variant="h6" component="h6">
              {title}
            </Typography>
          )}
          <Typography variant="body2">{bodyText}</Typography>
        </div>
      </CardContent>
    </MuiCard>
  );
};

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default Alert;
