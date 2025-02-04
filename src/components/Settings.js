import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSignOut } from '@fortawesome/free-solid-svg-icons'; 
import React, { useState } from 'react';
import Sidebar from './SideBar';
import { Link } from 'react-router-dom';
import './Settings.scss';

const Settings = () => {
       const [isNav,setisNav] = useState(false);
        const handleClick = () => {
            setisNav(prev => !prev); 
    
    
        };
  return <div className='settings'>
            <Sidebar a ={isNav} onClose={() => setisNav(false)} />

      <div className='topBarCont'>
                  <div onClick={handleClick}><FontAwesomeIcon icon ={faGear} size='2x' /></div>
                  <p>TERESA ORSINI HOMES</p>
                  <div> <li><Link to="/login"><FontAwesomeIcon icon ={faSignOut} size='2x' /></Link></li>
                  </div>
              </div>
              <p>Settings</p>
              <div className='settingsBody'>
                <div>Account information</div>
                <div>Security</div>
              </div>
  </div>;
};

export default Settings;
