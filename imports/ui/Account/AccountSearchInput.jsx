import React from 'react';

const AccountSearchInput = ({account, changed}) => {
  return (
    <div className="account-search">
      <input type="text" placeholder="Search for account..." value={account} onChange={changed}/>
    </div>
  );
};

export default AccountSearchInput;
