// External Dependencies
import React from 'react';
import { withRouter } from 'react-router-dom';

// Local Styles
const rootStyles = {
  margin: '1rem 0',
};

const labelStyles = {
  display: 'block',
  fontSize: '67.5%',
  letterSpacing: '0.125em',
  textTransform: 'uppercase',
};

const inputStyles = {
  display: 'block',
  fontSize: '1rem',
  padding: '0.25rem',
};

const buttonStyles = {
  backgroundColor: 'rebeccapurple',
  border: 0,
  color: 'white',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginTop: '0.5rem',
  padding: '0.25rem 1rem',
  transition: 'background-color 150ms linear',
};

// Component Definition
export default withRouter(({ handleSubmit, handleUpdate, history }) => (
  <form
    css={rootStyles}
    method="post"
    onSubmit={event => {
      handleSubmit(event);
      history.push('/members');
    }}
  >
    <p>
      Please log in with the username <code>gatsby</code> and the
      password <code>demo</code>.
    </p>
    <label css={labelStyles}>
      Username
      <input
        css={inputStyles}
        type="text"
        name="username"
        onChange={handleUpdate}
      />
    </label>
    <label css={labelStyles}>
      Password
      <input
        css={inputStyles}
        type="password"
        name="password"
        onChange={handleUpdate}
      />
    </label>
    <input css={buttonStyles} type="submit" value="Log In" />
  </form>
));
