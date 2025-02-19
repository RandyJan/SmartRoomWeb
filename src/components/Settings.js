import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList,faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import React, { useState,useEffect,useRef } from 'react';
import Sidebar from './SideBar';
import { Link,useLocation,useNavigate  } from 'react-router-dom';
import './Settings.scss';
import Loader from 'react-loaders';
import Swal from 'sweetalert2';
import axios from 'axios';
import Savelogs from './Savelogs';
const Settings = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isNav, setisNav] = useState(false);
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('');
  const[position,setPosition] = useState('');
  const [currentpw,setCurrentpw]=useState('');
  const[disabled,setDisabled]=useState(false);
  const[newpw,setNewpw]=useState('')
  const[confpw,setConfpw] = useState('');
  const[userpw,setUserpw]=useState('');
  const currInp = useRef(null);
  const serverCreds = localStorage.getItem('serverCreds');
  const navigate = useNavigate ();

  const handleClick = () => {

    setisNav(prev => !prev);


  };
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    handleStart();
    const timer = setTimeout(handleComplete, 1000); // Simulate loading time

    return () => clearTimeout(timer);
}, [location]);
// const handleCheckCurrentpw = ()=>{
//   if(userpw!=currentpw){
//     Swal.fire({
//       title: 'Error!',
//       text: 'Current password is incorrect',
//       icon: 'error',
//       confirmButtonText: 'Okay'
//     });
//     return;
//   }
// }
const clearInputs=()=>{
  setUserpw('');
  setNewpw('');
    setConfpw('');
}
const logOut= async()=>{
  localStorage.setItem('session',0);
        localStorage.removeItem('userLogin');
       await Savelogs.saveLog(username,'Logged out');
        navigate('/login');
}
const changePassword = async () => {
  try {
     

    if (!currentpw || !newpw || !confpw) {
      Swal.fire({
        title: 'Error!',
        text: 'Fill all required fields',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      return; // Exit the function if fields are not filled
    }
    else if(userpw!== currentpw){
      Swal.fire({
        title: 'Error!',
        text: 'Current password is incorrect',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      return;
    }else{

      if (newpw !== confpw) {
        Swal.fire({
          title: 'Error!',
          text: 'New password and confirm password do not match',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
        return; // Exit the function if passwords do not match
      }else{
        const response = await axios.post(`http://${serverCreds}/api/changepw`, {
          email,
          confpw,
        });
    
      await Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });
       await Savelogs.saveLog(username,'Changed Password');

        clearInputs();
        logOut();
      }
    }


    
  } catch (error) {
    // Handle errors from handleCheckCurrentpw or axios
    Swal.fire({
      title: 'Error!',
      text: error.message || error,
      icon: 'error',
      confirmButtonText: 'Okay'
    });
  }
};
const handleChange = (e,inp)=>{
  setUserpw(e.target.value);
}
const handleChangeb = (e,inp)=>{
  setNewpw(e.target.value);
}
const handleChangec = (e,inp)=>{
  setConfpw(e.target.value);
}
useEffect(()=>{
  const userCredentials = JSON.parse(localStorage.getItem('userLogin')) || [];
      setUsername(userCredentials['name']);
      setEmail(userCredentials['email']);
      setPosition(userCredentials['position']);
      setCurrentpw(userCredentials['password']);
},[]);
  return<> <div className='settings'>
    <Sidebar a={isNav} onClose={() => setisNav(false)} />

    <div className='topBarCont'>
      <div onClick={handleClick}><FontAwesomeIcon icon={faList} size='2x' /></div>
      <p>TERESA ORSINI HOMES</p>
      <div onClick={logOut}> <FontAwesomeIcon icon={faSignOut} size='2x' />
      </div>
    </div>
    <p className='title'>Settings</p>
    <div className='settingsBody'>
      <div className='accinfo'>
        <h3>Account information</h3>
        <label>Username</label>
        <input type='text' readOnly value={username} required></input>
        <label>Email</label>
        <input type='email' readOnly value={email} required></input>
        <label>Position</label>
        <input type='text' readOnly value={position} required></input>
      </div>
      <div className='security'>
        <h3>Security</h3>
        <p>Change Password</p>
        <label>Current Password</label>
        <input type='password' ref={currInp} onChange={handleChange}></input>
        <label> New Password</label>
        <input type='password'  disabled={disabled} onChange={handleChangeb}></input>
        <label>Confirm Password</label>
        <input type='password'  disabled={disabled}onChange={handleChangec}></input>
        <button className='buttonA btn_save' onClick={changePassword}>Save</button>
      </div>
    </div>
  </div>
  {loading && <Loader type='line-scale-pulse-out-rapid' />}
    </>
};

export default Settings;
