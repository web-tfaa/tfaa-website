// External Dependencies
import hex2rgba from 'hex2rgba';
import React from 'react';
// import { makeStyles } from '@material-ui/styles';

// Internal Dependencies
import ArrowForwardIcon from '../shared/ArrowForwardIcon';
import CtaButton from './cta-button';
import presets from '../../utils/presets';
import { rhythm, scale } from '../../utils/typography';
import {
  vP, vPHd, vPVHd, vPVVHd,
} from '../../utils/gutters';

// Local Variables
// const useStyles = makeStyles({
//   icon: {
//     transform: 'translateY(8px)',
//     marginLeft: '0.5em',
//   },
// });

const texasFlagBlue = '#002868';

// Component Definition
const Masthead = () => {
  // const classes = useStyles(props);
  return (
    <div
      className="masthead-content"
      css={{
        display: 'flex',
        padding: vP,
        paddingTop: rhythm(1),
        paddingBottom: rhythm(1),
        flexGrow: '0',
        flexShrink: '1',
        [presets.Mobile]: {
          paddingBottom: rhythm(2),
        },
        [presets.Phablet]: {
          paddingRight: 0,
        },
        [presets.Tablet]: {
          paddingTop: rhythm(4),
        },
        [presets.Desktop]: {
          paddingTop: rhythm(5),
        },
        [presets.Hd]: {
          paddingTop: rhythm(5),
          paddingLeft: vPHd,
          paddingBottom: rhythm(3),
        },
        [presets.VHd]: {
          paddingTop: rhythm(6),
          paddingLeft: vPVHd,
        },
        [presets.VVHd]: {
          paddingLeft: vPVVHd,
        },
      }}
    >
      <div>
        <h1
          css={{
            ...scale(0.7),
            color: texasFlagBlue,
            lineHeight: 1.2,
            margin: 0,
            marginBottom: '0.5em',
            padding: 0,
            width: rhythm(10),
            // fontSize: `calc(12px + 2vh + 2vw)`,
            [presets.Mobile]: {
              width: rhythm(10),
            },
            '@media (min-width: 650px)': {
              fontSize: scale(1).fontSize,
              width: rhythm(12),
            },
            [presets.Tablet]: {
              fontSize: scale(1.1).fontSize,
              width: rhythm(12),
            },
            [presets.Hd]: {
              fontSize: scale(1.4).fontSize,
              width: rhythm(14),
            },
            [presets.VHd]: {
              fontSize: scale(1.5).fontSize,
              width: rhythm(16),
            },
            [presets.VVHd]: {
              fontSize: scale(1.6).fontSize,
              width: rhythm(18),
            },
          }}
        >
          Texas Music Administrators Conference
        </h1>
        <div
          css={{
            color: `${hex2rgba(texasFlagBlue, 0.9)}`,
            display: 'none',
            fontSize: 20,
            marginBottom: '1.5em',
            padding: 0,
            width: rhythm(5),
            [presets.Tablet]: {
              display: 'block',
              width: rhythm(12),
            },
          }}
        >
          Supporting Music Education in Texas
        </div>
        <CtaButton
          buttonColor="blue"
          to="/about/"
        >
          <span>Learn More</span>
          <ArrowForwardIcon />
        </CtaButton>
      </div>
    </div>
  );
};

export default Masthead;
