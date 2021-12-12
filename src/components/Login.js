import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { kc } from './UserManagement';

const Login = () => {

  const login = () => kc.login();

  const logout = () => kc.logout();

  return (
    <Segment>
      <Button
        compact
        basic
        size="big"
        icon={'user circle outline'}
        content="Login"
        color={'blue'}
        as="a"
        target="_blank"
        onClick={login}
      />
    </Segment>
  );
};

export default Login;
