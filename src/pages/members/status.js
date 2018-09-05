// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import { auth } from '../../firebase';
import { options } from '../../utils/typography';

// Local Styles
const statusRootStyles = {
  background: colors.status,
  fontSize: '87.5%',
  width: `0 auto`,
  padding: '0.5rem',
};

const statusTextStyles = {
  margin: '0 auto',
  maxWidth: 640,
  textAlign: 'right',
};

// Component Definition
const Status = props => {
  const { authUser } = props;

  const isAuthenticated = Boolean(authUser);

  const details = !isAuthenticated ? (
    <p css={statusTextStyles}>
      To access the Members area, please&nbsp;
      <Link to="/members/login">log in</Link>.
    </p>
  ) : (
    <p css={statusTextStyles}>
      Logged in as {authUser.email}
      &nbsp;
      <a
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
          },
        }}
        href="/members#"
        onClick={auth.doSignOut}>
        Sign out
      </a>
    </p>
  );

  return <div css={statusRootStyles}>{details}</div>;
};

Status.propTypes = {
  authUser: PropTypes.shape({}),
};
Status.defaultProps = {
  authUser: null,
};

export default Status;
