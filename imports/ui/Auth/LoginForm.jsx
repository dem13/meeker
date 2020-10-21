import React, {useState} from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);

    if (!Meteor.user()) {
      setError("Invalid username or password")
    }
  };

  return (
    <form onSubmit={submit} className="login-form">
      <div className="login-form-header">Login</div>

      {error === '' ? '' :
        <div className="login-form-error" onClick={() => setError('')}>
          <div className="login-form-error-message">
            {error}
          </div>
        </div>
      }

      <div className="login-form-row">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div className="login-form-row">
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="login-form-row">
        <button type="submit">Log In</button>
      </div>
    </form>
  );
};

export default LoginForm;
