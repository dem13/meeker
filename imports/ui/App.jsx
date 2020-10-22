import {Meteor} from "meteor/meteor";
import React, {useState} from 'react';
import {useTracker} from "meteor/react-meteor-data";

import Home from "./Pages/Home";
import Header from "./Header";
import Login from "./Pages/Login";
import AccountForm from "./Account/AccountForm";
import AccountModal from "./Account/AccountModal";

export const App = () => {
  const [showAccountModal, setShowAccountModal] = useState(false);

  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();

  const createAccountHandler = () => setShowAccountModal(true)

  const accountModalClosedHandler = () => setShowAccountModal(false);

  return (
    <div>
      <Header user={user} logout={logout} createAccount={createAccountHandler}/>
      <main>
        {user ? <Home/> : <Login/>}
      </main>
      <AccountModal show={showAccountModal} closed={accountModalClosedHandler}>
        <AccountForm created={accountModalClosedHandler}/>
      </AccountModal>
    </div>
  )
};
