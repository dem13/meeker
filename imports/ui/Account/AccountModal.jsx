import React from 'react';

const AccountModal = ({show, children, closed}) => {
  const classes = ["account-modal"];

  if (show) {
    classes.push('active');
  }

  const modalClickHandler = function (e) {
    if(e.target.classList.contains('account-modal')) {
      closed()
    }
  };

  return (
    <div className={classes.join(' ')} onClick={modalClickHandler}>
      <div className="account-modal-content">
        {children}
      </div>
    </div>
  );
};

export default AccountModal;
