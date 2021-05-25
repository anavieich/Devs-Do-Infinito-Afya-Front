import React from 'react';

import FormSignIn from '../../../components/FormSignIn';
import FormSignUp from '../../../components/FormSignUp';

import { LoginContent } from './styles';

const Login: React.FC = () => {
  return (
    <LoginContent>
      <div className="container">
        <div className="col">
          <FormSignUp />
          <FormSignIn />
        </div>
      </div>
    </LoginContent>
  );
}

export default Login;