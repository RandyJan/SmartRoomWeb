// src/pages/Home.js
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSignOut } from '@fortawesome/free-solid-svg-icons'; //
import Sidebar from './SideBar';
import React, { useState } from 'react'; // Correct


const Home = () => {
    const [isNav,setisNav] = useState(false);
    const handleClick = () => {
        setisNav(prev => !prev); 


    };
    // const handleToggle = () => {
    //     setisNav(prev => !prev); 
    // };
  return <div className='home'>
            <Sidebar a ={isNav} onClose={() => setisNav(false)} />
    
        <div className='topBarCont'>
            <div onClick={handleClick}><FontAwesomeIcon icon ={faGear} size='2x' /></div>
            <p>TERESA ORSINI HOMES</p>
            <div><FontAwesomeIcon icon ={faSignOut} size='2x' /></div>
        </div>
        <div className='homeBody'>
            <div className='sensorCard'>
                <div>
                <h3>Room #</h3>
                <p> room is on its fine state</p>      
                </div>
              
                <div className='sensors'>
                <div> Temp</div>
                <div> hum</div>
                <div> Smoke</div>
                <div> motion</div>
                </div>
                <div className='btn_view'><p>View</p> </div>
            </div>
            <div className='sensorCard'>
            </div>
            <div className='sensorCard'>
            </div>
            <div className='sensorCard'>
            </div>  <div className='sensorCard'>
            </div>
        </div>

  </div>
  ;
};

export default Home;
