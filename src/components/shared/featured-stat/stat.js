// External Dependencies
import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Internal Dependencies
import presets from '../../../utils/presets';
import { rhythm } from '../../../utils/typography';
import { vP, vPHd, vPVHd } from '../../../utils/gutters';

// Local Variables
const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.shape({}),
  title: PropTypes.bool,
};
const defaultProps = {
  icon: null,
  title: false,
};

const StyledRoot = styled.div(({ $color, $hasTitle, theme }) => ({
  '.innerWrapper': {
    [presets.Mobile]: {
      padding: vP,
      paddingBottom: 0,
    },
    [presets.Phablet]: {
      padding: vP,
    },
    [presets.VHd]: {
      padding: vPHd,
    },
    [presets.VVHd]: {
      padding: vPVHd,
    },

    padding: rhythm(presets.gutters.default / 2),
    paddingBottom: 0,
    transform: 'translateZ(0)',
  },

  [theme.breakpoints.up('mobile')]: {
    flex: '0 0 15%',
    width: '90%',
    boxShadow: '1px 3px 5px 0 #aaa',
  },
  [presets.Hd]: {
    flex: '0 0 15%',
    width: '15%',
  },

  alignItems: 'center',
  background: 'white',
  border: `3px solid ${$color}`,
  borderRadius: presets.radiusLg,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  fontSize: $hasTitle ? 24 : 16,
  fontWeight: $hasTitle ? 600 : 'inherit',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  transform: 'translateZ(0)',
  width: '60%',
}));

// Component Definition
const Stat = ({
  children,
  color,
  icon: Icon,
  title,
}) => (
  <StyledRoot
    $color={color}
    $hasTitle={Boolean(title)}
  >
    <div className="innerWrapper">
      <Box marginBottom={title ? 0 : 2}>
        {Icon ? (
          <Icon
            htmlColor={color}
            width="3em"
            height="3em"
          />
        ) : null}
      </Box>

      {children}
    </div>
  </StyledRoot>
);

Stat.propTypes = propTypes;
Stat.defaultProps = defaultProps;

export default Stat;
