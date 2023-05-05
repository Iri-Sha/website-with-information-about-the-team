import React from 'react';
import './header.less'

const Header = ({children}) => {
  return (
    <header className="header">
      <div className="header-info">
        {children}
      </div>
    </header>
  )
};

export default Header;