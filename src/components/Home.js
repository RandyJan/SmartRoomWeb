// src/pages/Home.js
import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList,faGear,faSignOut,faArrowRight,faSmoking,faWater,faTemperatureArrowUp,faTemperatureArrowDown,faTemperatureHalf } from '@fortawesome/free-solid-svg-icons'; 
import Sidebar from './SideBar';
import React, { useState,useEffect } from 'react';
import { Link,useLocation,useNavigate  } from 'react-router-dom';
import Loader from 'react-loaders';
import Modal from './Modal';
import Login from './Login';
import axios from 'axios';
import Savelogs from './Savelogs';
const Home = () => {
    const [isNav,setisNav] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate ();
    const [isAuthenticated, setIsAuthenticated] = useState('0');
   const serverCreds = localStorage.getItem('serverCreds'); 
   const [sensorData,setSensorData]= useState({});  
   const [modalData, setModalData] = useState(null);
  const[roomState,setRoomstate] = useState(0);
  const[currentTemp,setCurrentTemp]=useState(0);
  const[currentHum,setCurrentHum]=useState(0);
  const [currentGas,setCurrentGas]=useState(0);

  const[currentData,setCurrentData]=useState({});
const loggedRooms = new Set();
  // const[usercreds,setusercreds]= useState({});
const userCredentials = JSON.parse(localStorage.getItem('userLogin'));

  const handleRoom = (state)=>{
    setRoomstate(state);
  };
useEffect(()=>{
    const fetchData = async () =>{
        try{
            const response = await fetch('http://'+serverCreds+'/api/getData');
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setSensorData(data);
              // console.log(data);
              data.forEach(e => {
                if(e.temperature >= 24){
                   Savelogs.saveLog(userCredentials['name'],'Temperature too high.',e.room);
                }
                 if(e.temperature <= 15){
                  Savelogs.saveLog(userCredentials['name'],'Temperature too low.',e.room);
                } if(e.humidity <= 30){
                  Savelogs.saveLog(userCredentials['name'],'Humidity too low.',e.room);
                }
                 if(e.humidity >=60){
                  Savelogs.saveLog(userCredentials['name'],'Humidity too high.',e.room);
                }
                 if(e.smoke >0){ 
                  Savelogs.saveLog(userCredentials['name'],'Smoke/Gas Detected.',e.room);
                }
                // else{
                //   return;
                // }
              });
             
        }catch(error){
            console.log(error);
        }
    };

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
},[sensorData]);

// useEffect(()=>{
//   const logsUpdate = ()=>{
//     try{
//       sensorData.forEach(e => {
//         if(e.temperature >= 24){
//            Savelogs.saveLog(userCredentials['name'],'Temperature too high.',e.room);
//         }
//          if(e.temperature <= 15){
//           Savelogs.saveLog(userCredentials['name'],'Temperature too low.',e.room);
//         } if(e.humidity <= 30){
//           Savelogs.saveLog(userCredentials['name'],'Humidity too low.',e.room);
//         }
//          if(e.humidity >=60){
//           Savelogs.saveLog(userCredentials['name'],'Humidity too high.',e.room);
//         }
//          if(e.smoke >0){ 
//           Savelogs.saveLog(userCredentials['name'],'Smoke/Gas Detected.',e.room);
//         }

//       });
//     }catch(error){
//       console.log(error);
//     }
//   }
  
//   const intervalId = setInterval(logsUpdate, 5000);
//   return () => clearInterval(intervalId);
   
// },[sensorData]);
// useEffect(()=>{
//   try{
//     console.log(sensorData);
//     const Jsonify = JSON.parse(sensorData);
//     Jsonify.forEach(e => {
//       if(e.temperature >= 24){
//          Savelogs.saveLog(userCredentials['name'],'Temperature too high.',e.room);
//       }
//       if(e.temperature <= 15){
//         Savelogs.saveLog(userCredentials['name','Temperature too low.',e.room]);
//       }if(e.humidity <= 30){
//         Savelogs.saveLog(userCredentials['name','Humidity too low.',e.room]);
//       }
//       if(e.humidity >=60){
//         Savelogs.saveLog(userCredentials['name','Humidity too high.',e.room]);
//       }
//       if(e.smoke >0){ 
//         Savelogs.saveLog(userCredentials['name','Smoke/Gas Detected.',e.room]);
//       }
//     });
//   }catch(e){
//     console.log(e);
//   }
// },[1000]);

   useEffect(() => {  setIsAuthenticated(localStorage.getItem('session'));  }, [isAuthenticated]);
        const location = useLocation();
    const handleClick = () => {
        setisNav(prev => !prev); 


    };
    const handleLogOut = async ()=>{
        localStorage.setItem('session',0);
        localStorage.removeItem('userLogin');

      await Savelogs.saveLog(userCredentials['name'],'Logged out');
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

    const openModal = async (room,temp,hum,gas,motion) =>{
      await Savelogs.saveLog(userCredentials['name'],'Viewed room ',room);

        setModalData({room,temp,hum,gas,motion})
        setIsModalOpen(true);  
    } 
    const closeModal = () => setIsModalOpen(false);
  return <>{isAuthenticated == 1 ? (
  <div className='home'>
            <Sidebar a ={isNav} onClose={() => setisNav(false)} />
    
        <div className='topBarCont'>
            <div onClick={handleClick}><FontAwesomeIcon icon ={faList} size='2x' /></div>
            <p>TERESA ORSINI HOMES</p>
            <div onClick={handleLogOut}> <FontAwesomeIcon icon ={faSignOut} size='2x' />
            </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal} data={modalData} />

        <p className='title'>Dashboard</p>
        <div className='homeBody'>

        {sensorData && sensorData.length > 0 ? (
  sensorData.map(sensor => (
    <div key={sensor.room} className='sensorCard'> 
      <div className='cardHeader'>
        <h3>Room {sensor.room}</h3>
        <div className='roomState'>
        <p>{sensor.smoke > 0?"Smoke/Gas Detected!":""}</p>
        <p>{sensor.temperature >=0 && sensor.temperature <= 15?"Temperature is too low.":sensor.temperature >=15 && sensor.temperature <= 24?"":"Temperature is too high."}</p>      
        <p>{sensor.humidity >=0 && sensor.humidity <= 30 ? 'Humidity is too low.' :sensor.humidity > 30 && sensor.humidity < 60?"":'Humidity is too high.'}</p>
        </div>
      </div>
      
      <div className='sensors'>
        {sensor.temperature >=0 && sensor.temperature <= 15?  
        <div className='low'> <FontAwesomeIcon icon={faTemperatureArrowDown} size='2x' /></div>:
        sensor.temperature >=15 && sensor.temperature <= 24?<div className='normal'> <FontAwesomeIcon icon={faTemperatureHalf} size='2x' /></div>:<div className='danger'> <FontAwesomeIcon icon={faTemperatureArrowUp} size='2x' /></div>
        
    }
        <div className={
  (sensor.humidity >=0 && sensor.humidity <= 30) ? 'low' :
  (sensor.humidity > 30 && sensor.humidity < 60) ? 'normal' :
  'danger'
}> <FontAwesomeIcon icon={faWater} size='2x' /></div>
        <div className={sensor.smoke > 0?'danger':''}> <FontAwesomeIcon icon={faSmoking} size='2x' /></div>
        <div className={sensor.motion >0?'normal':''}> <FontAwesomeIcon icon={faArrowRight} size='2x' /></div>
      </div>
      <div className='btn_view' onClick={() => openModal(sensor.room,sensor.temperature, sensor.humidity, sensor.smoke, sensor.motion)}><p>View</p></div>
    </div>
  ))
) : (
  <Loader type='line-scale-pulse-out-rapid' />
)}
           
           
            
           
        </div>
        {/* {loading && <Loader type='line-scale-pulse-out-rapid' />} */}
  </div>
  ): (
    <Login setAuth={setIsAuthenticated}/>
  )}
  </>
  ;
};

export default Home;
