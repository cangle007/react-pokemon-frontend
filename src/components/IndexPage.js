import React from 'react';
import IndexComponent from './IndexComponent';

export default function SignInPage({
  signIn,
  userSignIn,
  errorMessage,
  history,
  userSignup,
  signUp,
  users
}) {
  return (
    <div>
      <IndexComponent
        signIn={signIn}
        history={history}
        userSignIn={userSignIn}
        errorMessage={errorMessage}
        userSignup={userSignup}
        signUp={signUp}
        users={users}
      />
    </div>
  );
}
