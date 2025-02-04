import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSignOut,faArrowRight,faSmoking,faWater,faTemperature0 } from '@fortawesome/free-solid-svg-icons'; 
import React, { useState } from 'react';
import Sidebar from './SideBar';


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
                    <div><FontAwesomeIcon icon ={faSignOut} size='2x' /></div>
                </div>
  </div>;
};

export default Settings;
