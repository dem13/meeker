import React from 'react';

const Account = ({account}) => {
  return (
    <div className="account-item">
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
