import React from 'react';

const Navbar = ({ children }) => (
  <header>
    <nav className="navbar navbar-light justify-content-between">
      <a className="navbar-brand">Rale à vie</a>
      {children}
    </nav>
  </header>
);

export default Navbar;