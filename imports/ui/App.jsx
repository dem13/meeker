import React from 'react';

import Home from "./pages/Home";
import Header from "./Header";

export const App = () => {
  return (
    <div>
      <Header/>
      <main>
        <Home/>
      </main>
    </div>
  )
};
