import React, {useState} from 'react';

const AccountPanel = ({account}) => {
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [show, setShow] = useState(false);


  const passwordClasses = ["account-panel-password"];

  const canCopy = navigator.clipboard !== undefined;

  if(canCopy) {
    passwordClasses.push('copy')
  }

  const keyDownHandler = (e) => {
    if (e.key === 'Enter' && secret !== "") {
      return Meteor.call('accounts.decrypt', {_id: account._id, secret}, (err, hash) => {
        if (!err && hash !== "") {
          setShow(false);
          setSecret("");
          setPassword(hash);
        } else {
          setPassword("");
        }
      });
    }
  }

  const onChangeHandler = e => setSecret(e.target.value);

  const onClickHandler = () => {
    if(show && canCopy) {
      navigator.clipboard.writeText(password).catch(err => console.log(err));
    }

    if(!canCopy) {
      return setShow(true);
    }

    setShow(!show);
  };

  return (
    <div className="account-panel">
      <div className="account-panel-decryption">
        <div className="account-panel-secret">
          <input
            type="password"
            name="secret"
            value={secret}
            onKeyDown={keyDownHandler}
            onChange={onChangeHandler}
            placeholder="Secret"/>
        </div>
        {password === "" ? null :
          <div className="account-panel-decrypted" onClick={onClickHandler}>
            <div className={passwordClasses.join(' ')}>
              <div className="account-panel-password-text">
                {show ? password: password.split("").map(c => "*")}
              </div>
              <div className="account-panel-password-replace">
                {show ? "Copy" : "Show"}
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  );
};

export default AccountPanel;
