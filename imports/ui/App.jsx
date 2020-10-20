import React from 'react';
import {useTracker} from 'meteor/react-meteor-data'

import Account from "./Account";
import {AccountCollection} from "../api/AccountCollection";

export const App = () => {
  const accounts = useTracker(() => AccountCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      {accounts.map(account => <Account key={account._id} account={account}/>)}

    </div>
  )
};
