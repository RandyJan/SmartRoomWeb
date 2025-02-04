// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'
const Navbar = () => {
  return (
    <div className='containerB' >
        <div className = 'TopBar'>
            test
        </div>
    <div className='SideBar'>
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logs">Logs</Link></li>
      </ul>
    </nav>
    </div>
    </div>

  );
};

export default Navbar;
