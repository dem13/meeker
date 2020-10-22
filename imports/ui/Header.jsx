import React, {Fragment} from 'react';

const Header = ({user, createAccount, logout}) => {
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
            (
              <Fragment>
                <div className="header-button" onClick={createAccount}>
                  Create Account
                </div>

                <div className="header-button" onClick={logout}>
                  Logout
                </div>
              </Fragment>
            ) : ''
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
