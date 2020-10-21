import React from 'react';

const Header = ({user, logout}) => {
  return (
    <header>
      <div className="header-item header-logo">
        <div className="header-logo-img">
          <img src="/img/logo-small.png" alt=""/>
        </div>
        <div className="header-logo-title">
          MEEKER
        </div>
      </div>
      <div className="header-item header-right">
        <div className="header-nav">
          {user ?
            <div className="header-button" onClick={logout}>
              Logout
            </div> : ''
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
