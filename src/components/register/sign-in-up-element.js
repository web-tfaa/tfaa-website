// External Dependencies
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { navigate } from 'gatsby';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';

// Component Definition
class SignInUpElement extends Component {
  static propTypes = {
    onClickSignIn: PropTypes.func,
    viewSignUp: PropTypes.bool,
  };

  static defaultProps = {
    onClickSignIn: null,
    viewSignUp: false,
  };

  handleClickSignIn = () => {
    const { onClickSignIn } = this.props;

    return onClickSignIn ? onClickSignIn() : navigate('/members/login');
  };

  handleClickSignUp = () => {
    navigate('/members/sign-up');
  };

  render() {
    const { onClickSignIn, viewSignUp } = this.props;

    return (
      <div css={{ marginBottom: 32 }}>
        <div css={{ marginBottom: 16 }}>
          {`${viewSignUp ? "Don't" : 'Already'}`} have an account?
        </div>
        <span
          css={{
            color: 'inherit',
            textDecoration: 'none',
            transition: `all ${presets.animation.speedFast} ${
              presets.animation.curveDefault
            }`,
            borderBottom: `1px solid ${colors.ui.bright}`,
            boxShadow: `inset 0 -2px 0px 0px ${colors.ui.bright}`,
            fontFamily: options.headerFontFamily.join(','),
            fontWeight: 'bold',
            '&:hover': {
              background: colors.ui.bright,
              cursor: 'pointer',
            },
          }}
          onClick={
            viewSignUp
              ? this.handleClickSignUp
              : onClickSignIn || this.handleClickSignIn
          }
          onKeyPress={
            viewSignUp
              ? this.handleClickSignUp
              : onClickSignIn || this.handleClickSignIn
          }
          role="button"
          tabIndex={0}
        >
          {`Sign ${viewSignUp ? 'Up' : 'In'}!`}
        </span>
      </div>
    );
  }
}

export default SignInUpElement;
