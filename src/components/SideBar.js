// src/components/Sidebar.js
import React, { useState,useEffect  } from 'react'; // Correct

import { Link } from 'react-router-dom';
import './SideBar.scss'; // Importing CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons'; //

const Sidebar = ({a=false,onClose}) => {
 const [isActive, setIsActive] = useState(a);
 useEffect(() => {
    setIsActive(a);
}, [a]);

    const handleClick = () => {
    
        setIsActive(false); // Toggle the active state
    };

  return (
    <div className={isActive ?'sidebar slide-in':'close'} >
        <div onClick={onClose}><FontAwesomeIcon icon ={faClose} size='2x' /></div>
      <h2>TOH</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logs">Logs</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
