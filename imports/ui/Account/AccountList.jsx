import React from 'react';
import Account from "./Account";

const AccountList = ({accounts, accountClicked}) => {
  return (
    <div className="account-list">
      {accounts.map(account => <Account clicked={() => {
        accountClicked(account)
      }} key={account._id} account={account}/>)}
    </div>
  );
};

export default AccountList;
