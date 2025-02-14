import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faSignOut } from '@fortawesome/free-solid-svg-icons'; 
import React, { useState,useEffect } from 'react';
import { Link,useLocation,useNavigate  } from 'react-router-dom';
import Loader from 'react-loaders';
import Sidebar from './SideBar';
import './Logs.scss';
import Savelogs from './Savelogs';
const Logs = () => {
    const [isNav,setisNav] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const userCredentials = JSON.parse(localStorage.getItem('userLogin'));
      const handleClick = () => {
          setisNav(prev => !prev); 
  
  
      };
      const logOut= async()=>{
        localStorage.setItem('session',0);
              localStorage.removeItem('userLogin');
              await Savelogs.saveLog(userCredentials['name'],'Logged out');
              navigate('/login');
      };
      useEffect(() => {
          const handleStart = () => setLoading(true);
          const handleComplete = () => setLoading(false);
      
          handleStart();
          const timer = setTimeout(handleComplete, 1000); 
      
          return () => clearTimeout(timer);
      }, [location]);
  return<> <div className='logs'>
    <Sidebar a ={isNav} onClose={() => setisNav(false)} />
    <div className='topBarCont'>
            <div onClick={handleClick}><FontAwesomeIcon icon ={faGear} size='2x' /></div>
            <p>TERESA ORSINI HOMES</p>
            <div onClick={logOut}><FontAwesomeIcon icon ={faSignOut} size='2x' />
            </div>
        </div>
            <p className='title'>History</p>
        <div className='logsBody'>
        <table className="message-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>User</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>TEST</td>
                        <td>TEST</td>
                        <td>TEST</td>
                        <td>TEST</td>
                  
                    </tr>
            </tbody>
        </table>
        </div>
  </div>;
          {loading && <Loader type='line-scale-pulse-out-rapid' />}
  </>
};

export default Logs;
