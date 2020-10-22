import React, {useState} from 'react';

const AccountForm = ({created}) => {
  const [account, setAccount] = useState({
    title: '',
    password: '',
    secret: ''
  })


  const submit = e => {
    e.preventDefault();

    Meteor.call('accounts.insert', account);

    created();

    setAccount({
      title: '',
      password: '',
      secret: ''
    });
  };

  return (
    <form className="account-form" onSubmit={submit}>
      <div className="account-form-header">
        Create Account
      </div>

      <div className="account-form-row">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={account.title}
          onChange={e => setAccount({...account, title: e.target.value})}
          required/>
      </div>

      <div className="account-form-row">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={account.password}
          onChange={e => setAccount({...account, password: e.target.value})}
          required/>
      </div>

      <div className="account-form-row">
        <input
          type="password"
          name="secret"
          placeholder="Secret Key"
          value={account.secret}
          onChange={e => setAccount({...account, secret: e.target.value})}
          required/>
      </div>

      <div className="account-form-row">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default AccountForm;
