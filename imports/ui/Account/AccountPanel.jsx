import React, {useState} from 'react';

const AccountPanel = ({account, removed}) => {
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [show, setShow] = useState(false);
  const [invalidSecret, setInvalidSecret] = useState(false);

  const passwordClasses = ["account-panel-password"];

  const secretClasses = ['account-panel-secret'];

  const canCopy = navigator.clipboard !== undefined;

  if (canCopy) {
    passwordClasses.push('copy')
  }

  if (invalidSecret) {
    secretClasses.push('invalid');
  }

  const keyDownHandler = (e) => {
    if (e.key === 'Enter' && secret !== "") {
      return Meteor.call('accounts.decrypt', {_id: account._id, secret}, (err, hash) => {
        if (!err && hash !== "") {
          setShow(false);
          setSecret("");
          setInvalidSecret(false);
          setPassword(atob(hash));
        } else if (err.error === "accounts.decrypt.bad_decrypt") {
          setInvalidSecret(true);
          setPassword("");
        }
      });
    }
  }

  const onChangeHandler = e => setSecret(e.target.value);

  const onPasswordClickHandler = () => {
    if (show && canCopy) {
      navigator.clipboard.writeText(password).catch(err => console.log(err));
    }

    if (!canCopy) {
      return setShow(true);
    }

    setShow(!show);
  };

  const onDeleteClickHandler = () => {
    if (confirm('You really want to delete account?')) {
      Meteor.call('accounts.remove', account._id, (err, res) => {
        if (!err) {
          removed();
        }
      })
    }
  }

  return (
    <div className="account-panel">
      <div className="account-panel-decryption">
        <div className={secretClasses.join(' ')}>
          <input
            type="password"
            name="secret"
            value={secret}
            onKeyDown={keyDownHandler}
            onChange={onChangeHandler}
            autoComplete={false}
            placeholder="Secret"/>
        </div>
        {password === "" ? null :
          <div className="account-panel-decrypted" onClick={onPasswordClickHandler}>
            <div className={passwordClasses.join(' ')}>
              <div className="account-panel-password-text">
                {show ? password : password.split("").map(c => "*")}
              </div>
              <div className="account-panel-password-replace">
                {show ? "Copy" : "Show"}
              </div>
            </div>
          </div>
        }
      </div>

      <div className="account-panel-bottom">
        <div className="account-panel-bottom-item">
          <button onClick={onDeleteClickHandler} className="account-panel-delete-btn">Delete</button>
        </div>
      </div>

    </div>
  );
};

export default AccountPanel;
