import React from 'react';

const AccountSearchInput = ({account, changed}) => {
  return (
    <div className="account-search">
      <input
        type="text"
        placeholder="Search for account..."
        value={account}
        onChange={changed}
        autoComplete="new-password"/>
    </div>
  );
};

export default AccountSearchInput;
