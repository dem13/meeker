import React, {useState} from 'react';

const AccountForm = ({created}) => {
  const [account, setAccount] = useState({
    title: '',
    password: '',
    secret: '',
    secret_confirm: '',
  })

  const [invalidConfirm, setInvalidConfirm] = useState(false);

  const checkConfirm = () => {
    if(invalidConfirm && account.secret === account.secret_confirm) {
      setInvalidConfirm(false);
    }
  };

  const submit = e => {
    e.preventDefault();

    if(account.secret !== account.secret_confirm) {
      return setInvalidConfirm(true);
    }

    delete account.secret_confirm;

    Meteor.call('accounts.insert', account);

    created();

    setAccount({
      title: '',
      password: '',
      secret: '',
      secret_confirm: '',
    });
    setInvalidConfirm(false);
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
          autoComplete={false}
          required/>
      </div>

      <div className="account-form-row">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={account.password}
          onChange={e => setAccount({...account, password: e.target.value})}
          autoComplete={false}
          required/>
      </div>

      <div className="account-form-row">
        <input
          type="password"
          name="secret"
          placeholder="Secret Key"
          value={account.secret}
          onChange={e => {
            checkConfirm();
            return setAccount({...account, secret: e.target.value})
          }}
          autoComplete={false}
          required/>
      </div>

      <div className="account-form-row">
        <input
          className={invalidConfirm ? 'invalid' : null}
          type="password"
          name="secret_confirm"
          placeholder="Secret Key Confirmation"
          value={account.secret_confirm}
          onChange={e => {
            checkConfirm();
            return setAccount({...account, secret_confirm: e.target.value})
          }}
          autoComplete={false}
          required/>
      </div>

      <div className="account-form-row">
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default AccountForm;
