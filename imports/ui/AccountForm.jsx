import React, {useState} from 'react';
import {AccountCollection} from "../api/AccountCollection";

const AccountForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!title) return;

    AccountCollection.insert({title, createdAt: new Date()});

    setTitle("");
  }

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>

      <button type="submit" >Add</button>
    </form>
  );
};

export default AccountForm;
