import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList,faGear,faSignOut } from '@fortawesome/free-solid-svg-icons'; 
import React, { useState,useEffect } from 'react';
import { Link,useLocation,useNavigate  } from 'react-router-dom';
import Loader from 'react-loaders';
import Sidebar from './SideBar';
import './Logs.scss';
import Savelogs from './Savelogs';
import axios from 'axios';
import Swal from 'sweetalert2';
const Logs = () => {
    const [isNav,setisNav] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [tableData,setTableData]=useState({});

    const userCredentials = JSON.parse(localStorage.getItem('userLogin'));
    const serverCreds = localStorage.getItem('serverCreds');

      const handleClick = () => {
          setisNav(prev => !prev); 
  
  
      };
      const handleClearLogs = async ()=>{
        try{
            const response = await axios.post('http://'+serverCreds+'/api/clearLogs');
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            //   }
            setTableData({pdate:0,user_name:0,activity:0,room:0});
              Swal.fire({
                icon:'success',
                title:'Clear History',
                text:'History cleared successfully! '

              });
        }catch(e){
            Swal.fire({
                icon:'error',
                title:'Clear History',
                text:e
              });
            console.log(e);
        }
      }
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
      useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch('http://'+serverCreds+'/api/getRecords');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                //   const jsonifyData = JSON.parse(response)

                  const data = await response.json();
                //   console.log(data);
                  setTableData(data);
                //   console.log(response.data);
                  // console.log(data);
              
                 
            }catch(error){
                console.log(error);
            }
        };
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);

      },[]);
  return<> <div className='logs'>
    <Sidebar a ={isNav} onClose={() => setisNav(false)} />
    <div className='topBarCont'>
            <div onClick={handleClick}><FontAwesomeIcon icon ={faList} size='2x' /></div>
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
                    <th>Username</th>
                    <th>Activity</th>
                    <th>Room no.</th>
                </tr>
            </thead>
            <tbody>
            {tableData && tableData.length > 0? (
                tableData.map(data =>(
                    <tr>
                        <td>{data.pdate}</td>
                        <td>{data.user_name}</td>
                        <td>{data.activity}</td>
                        <td>{data.room}</td>
                  
                    </tr>
                    ))) :(<Loader type='line-scale-pulse-out-rapid' />)}
            </tbody>
        </table>
        </div>
        <div className='btn_clear' onClick={handleClearLogs}><p>Clear</p></div>
  </div>
          {/* {loading && <Loader type='line-scale-pulse-out-rapid' />} */}
  </>
};

export default Logs;
