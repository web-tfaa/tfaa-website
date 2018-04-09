// External Dependencies
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

// Internal Dependencies
import presets, { colors } from '../../utils/presets';
import { options } from '../../utils/typography';
import { auth } from '../../firebase';

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
const Status = (props) => {
  const {
    authUser,
  } = props;

  const isAuthenticated = Boolean(authUser);

  const details = !isAuthenticated
    ? (
      <p css={statusTextStyles}>
        To access the Members area, you’ll need to{' '}
        <Link to="/members/login">log in</Link>.
      </p>
    )
  : (
      <p css={statusTextStyles}>
        Logged in as {authUser.email}&nbsp;
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
            }
          }}
          href="/members#"
          onClick={auth.doSignOut}
        >
          Sign out
        </a>
      </p>
    );

  return <div css={statusRootStyles}>{details}</div>;
};

export default withRouter(Status);
