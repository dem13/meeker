import React from 'react';
import {useTracker} from "meteor/react-meteor-data";

import Home from "./Pages/Home";
import Header from "./Header";
import Login from "./Pages/Login";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();

  return (
    <div>
      <Header user={user} logout={logout}/>
      <main>
        {user ? <Home/> : <Login/>}
      </main>
    </div>
  )
};
