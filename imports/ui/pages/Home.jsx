import React, {useState} from 'react';

import AccountSearchInput from "../Account/AccountSearchInput";
import {AccountCollection} from "../../api/AccountCollection";
import {useTracker} from 'meteor/react-meteor-data'
import AccountList from "../Account/AccountList";

const Home = () => {
  const [search, setSearch] = useState("");

  const accounts = useTracker(() => AccountCollection.find({title: {$regex: search, $options: "i"}}).fetch());

  const searchChangeHandler = (e) => setSearch(e.target.value);

  return (
    <div className="home">
      <AccountSearchInput search={search} changed={searchChangeHandler}/>

      <AccountList accounts={accounts}/>
    </div>
  );
};

export default Home;
