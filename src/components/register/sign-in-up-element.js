// External Dependencies
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { push } from 'gatsby';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';

// Local Variables

// Component Definition
class SignInUpElement extends Component {
  static propTypes = {
    signUp: PropTypes.bool,
  };

  static defaultProps = {
    signUp: false,
  };

  handleClickSignIn = () => {
    push('/members/login');
  }

  handleClickSignUp = () => {
    push('/members/sign-up');
  }

  render() {
    const {
      signUp,
    } = this.props;

    return (
      <Fragment>
        <div css={{ marginBottom: 16 }}>
          {`${signUp ? 'Don\'t' : 'Already'}`} have an account?
        </div>
        <span
          css={{
            color: `inherit`,
            textDecoration: `none`,
            transition: `all ${presets.animation.speedFast} ${
              presets.animation.curveDefault
            }`,
            borderBottom: `1px solid ${colors.ui.bright}`,
            boxShadow: `inset 0 -2px 0px 0px ${colors.ui.bright}`,
            fontFamily: options.headerFontFamily.join(`,`),
            fontWeight: `bold`,
            '&:hover': {
              background: colors.ui.bright,
              cursor: 'pointer',
            }
          }}
          onClick={signUp ? this.handleClickSignUp : this.handleClickSignIn}
        >
          {`Sign ${signUp ? 'Up' : 'In'}!`}
        </span>
      </Fragment>
    );
  }
}

export default SignInUpElement;
