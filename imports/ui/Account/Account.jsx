import React from 'react';

const Account = ({account, clicked}) => {
  return (
    <div className="account-item" onClick={clicked}>
      <div className="account-item-title">
        {account.title}
      </div>
      <div className="account-item-replace">
        Decrypt
      </div>
    </div>
  );
};

export default Account;
