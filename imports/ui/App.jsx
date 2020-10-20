import React from 'react';
import {useTracker} from 'meteor/react-meteor-data'

import Account from "./Account";
import AccountForm from "./AccountForm";
import {AccountCollection} from "../api/AccountCollection";

export const App = () => {
  const accounts = useTracker(() => AccountCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <AccountForm/>

      <ul>
        {accounts.map(account => <Account key={account._id} account={account}/>)}
      </ul>
    </div>
  )
};
