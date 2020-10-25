import React, {useState} from 'react';

import AccountSearchInput from "../Account/AccountSearchInput";
import {AccountsCollection} from "../../db/AccountsCollection";
import {useTracker} from 'meteor/react-meteor-data'
import AccountList from "../Account/AccountList";
import AccountModal from "../Account/AccountModal";
import AccountPanel from "../Account/AccountPanel";

const Home = () => {
  const [search, setSearch] = useState("");
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const {accounts, isLoading} = useTracker(() => {
    const noDataAvailable = {accounts: []};

    if(!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('accounts');

    if(!handler.ready()) {
      return {...noDataAvailable, isLoading: true}
    }

    const accounts = AccountsCollection.find({title: {$regex: search, $options: "i"}}).fetch();

    return {accounts};
  });

  const searchChangeHandler = (e) => setSearch(e.target.value);

  const accountClickedHandler = (account) => {
    setSelectedAccount(account);
    setShowAccountModal(true)
  };

  const accountModalClosedHandler = () => {
    setSelectedAccount(null);
    setShowAccountModal(false);
  }

  const accountRemovedHandler = () => {
    setSelectedAccount(null)
    setShowAccountModal(false);
  }

  return (
    <div className="home">
      <AccountSearchInput search={search} changed={searchChangeHandler}/>

      <AccountList accountClicked={accountClickedHandler} accounts={accounts}/>

      <AccountModal show={showAccountModal} closed={accountModalClosedHandler}>
        {selectedAccount ? <AccountPanel account={selectedAccount} removed={accountRemovedHandler}/> : null}
      </AccountModal>
    </div>
  );
};

export default Home;
