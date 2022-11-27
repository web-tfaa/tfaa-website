// External Dependencies
import { Link } from 'gatsby-theme-material-ui';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

// Internal Dependencies
import AuthUserContext from '../../components/session/AuthUserContext';
import { colors } from '../../utils/presets';
import { auth } from '../../firebase';
import { GatsbyContextProps } from '../../types/shared';

// Local Typings
interface Props {
  authUserEmail: string | null;
  isAuthenticated: boolean;
}

// Local Variables
const StyledRoot = styled.section(({ theme }) => ({
  '.anchor': {
    marginLeft: theme.spacing(1.5),
  },

  '.text': {
    fontSize: '0.9rem',
  },

  background: colors.status,
  display: 'flex',
  alignItems: 'center',
  fontSize: '87.5%',
  height: theme.spacing(6),
  justifyContent: 'flex-end',
  padding: theme.spacing(1),
}));

// Component Definition
const Status: FC<Props> = ({
  authUserEmail,
  isAuthenticated,
}) => {
  const details = !isAuthenticated ? (
    <Typography className="text">
      To access the Members area, please{' '}
      <Link to="/members/login">
        log in
      </Link>.
    </Typography>
  ) : (
    <Typography className="text">
      Signed in {authUserEmail ? `as ${authUserEmail}` : ''}
      <a
        className="anchor"
        href="/members"
        onClick={auth.doSignOut}
      >
        Sign out
      </a>
    </Typography>
  );

  return <StyledRoot>{details}</StyledRoot>;
};

const StatusWithContext = (props: GatsbyContextProps) => (
  <AuthUserContext.Consumer>
    {(authUser) => {
      const isAuthenticated = Boolean(authUser);
      const authUserEmail = authUser ? authUser.email : null;

      return (
        <Status
          {...props}
          authUserEmail={authUserEmail}
          isAuthenticated={isAuthenticated}
        />
      );
    }}
  </AuthUserContext.Consumer>
);

export default StatusWithContext;
