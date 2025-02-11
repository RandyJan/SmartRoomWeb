// src/pages/Home.js
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSignOut,faArrowRight,faSmoking,faWater,faTemperatureLow,faTemperature0 } from '@fortawesome/free-solid-svg-icons'; 
import Sidebar from './SideBar';
import React, { useState,useEffect } from 'react';
import { Link,useLocation,useNavigate  } from 'react-router-dom';
import Loader from 'react-loaders';
import Modal from './Modal';
import Login from './Login';

const Home = () => {
    const [isNav,setisNav] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate ();
    const [isAuthenticated, setIsAuthenticated] = useState('0');
   
   useEffect(() => {  setIsAuthenticated(localStorage.getItem('session'));  }, [isAuthenticated]);
        const location = useLocation();
    const handleClick = () => {
        setisNav(prev => !prev); 


    };
    const handleLogOut = ()=>{
        localStorage.setItem('session',0);
        localStorage.removeItem('userLogin');
        navigate('/login');
    }
     useEffect(() => {
              const handleStart = () => setLoading(true);
              const handleComplete = () => setLoading(false);
          
              handleStart();
              const timer = setTimeout(handleComplete, 1000); 
          
              return () => clearTimeout(timer);
          }, [location]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  return <>{isAuthenticated == 1 ? (
  <div className='home'>
            <Sidebar a ={isNav} onClose={() => setisNav(false)} />
    
        <div className='topBarCont'>
            <div onClick={handleClick}><FontAwesomeIcon icon ={faGear} size='2x' /></div>
            <p>TERESA ORSINI HOMES</p>
            <div onClick={handleLogOut}> <li><FontAwesomeIcon icon ={faSignOut} size='2x' /></li>
            </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} />

        <p className='title'>Dashboard</p>
        <div className='homeBody'>
            <div className='sensorCard'>
                <div>
                <h3>Room 1</h3>
                <p> room is on its fine state</p>      
                </div>
              
                <div className='sensors'>
                <div className='low'> <FontAwesomeIcon icon ={faTemperatureLow} size='2x' /></div>
                <div className='normal'>  <FontAwesomeIcon icon ={faWater} size='2x' /></div>
                <div className='danger'> <FontAwesomeIcon icon ={faSmoking} size='2x' /></div>
                <div className=''> <FontAwesomeIcon icon ={faArrowRight} size='2x' /></div>
                </div>
                <div className='btn_view' onClick={openModal}><p>View</p> </div>
            </div>
            <div className='sensorCard'>
                <div>
                <h3>Room #</h3>
                <p> room is on its fine state</p>      
                </div>
              
                <div className='sensors'>
                <div> <FontAwesomeIcon icon ={faTemperature0} size='2x' /></div>
                <div>  <FontAwesomeIcon icon ={faWater} size='2x' /></div>
                <div> <FontAwesomeIcon icon ={faSmoking} size='2x' /></div>
                <div> <FontAwesomeIcon icon ={faArrowRight} size='2x' /></div>
                </div>
                <div className='btn_view'><p>View</p> </div>
            </div>
            <div className='sensorCard'>
                <div>
                <h3>Room #</h3>
                <p> room is on its fine state</p>      
                </div>
              
                <div className='sensors'>
                <div> <FontAwesomeIcon icon ={faTemperature0} size='2x' /></div>
                <div>  <FontAwesomeIcon icon ={faWater} size='2x' /></div>
                <div> <FontAwesomeIcon icon ={faSmoking} size='2x' /></div>
                <div> <FontAwesomeIcon icon ={faArrowRight} size='2x' /></div>
                </div>
                <div className='btn_view'><p>View</p> </div>
            </div>
            <div className='sensorCard'>
                <div>
                <h3>Room #</h3>
                <p> room is on its fine state</p>      
                </div>
              
                <div className='sensors'>
                <div> <FontAwesomeIcon icon ={faTemperature0} size='2x' /></div>
                <div>  <FontAwesomeIcon icon ={faWater} size='2x' /></div>
                <div> <FontAwesomeIcon icon ={faSmoking} size='2x' /></div>
                <div> <FontAwesomeIcon icon ={faArrowRight} size='2x' /></div>
                </div>
                <div className='btn_view'><p>View</p> </div>
            </div>
           
           
            
           
        </div>
        {loading && <Loader type='line-scale-pulse-out-rapid' />}
  </div>
  ): (
    <Login setAuth={setIsAuthenticated}/>
  )}
  </>
  ;
};

export default Home;
