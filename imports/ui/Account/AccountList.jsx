import React from 'react';
import Account from "./Account";

const AccountList = ({accounts}) => {
  return (
    <div className="account-list" >
      {accounts.map(account => <Account key={account._id} account={account} />)}
    </div>
  );
};

export default AccountList;
