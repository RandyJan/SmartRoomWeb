import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import React, { useState,useEffect } from 'react';
import Sidebar from './SideBar';
import { Link,useLocation  } from 'react-router-dom';
import './Settings.scss';
import Loader from 'react-loaders';


const Settings = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isNav, setisNav] = useState(false);

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
  return<> <div className='settings'>
    <Sidebar a={isNav} onClose={() => setisNav(false)} />

    <div className='topBarCont'>
      <div onClick={handleClick}><FontAwesomeIcon icon={faGear} size='2x' /></div>
      <p>TERESA ORSINI HOMES</p>
      <div> <li><Link to="/login"><FontAwesomeIcon icon={faSignOut} size='2x' /></Link></li>
      </div>
    </div>
    <p className='title'>Settings</p>
    <div className='settingsBody'>
      <div className='accinfo'>
        <h3>Account information</h3>
        <label>Username</label>
        <input type='text' readOnly value="TEST NAME"></input>
        <label>Email</label>
        <input type='email' readOnly value="TEST@NAME.com"></input>
        <label>Position</label>
        <input type='text' readOnly value="Admin"></input>
      </div>
      <div className='security'>
        <h3>Security</h3>
        <p>Change Password</p>
        <label>Current Password</label>
        <input type='password' ></input>
        <label> New Password</label>
        <input type='password' ></input>
        <label>Confirm Password</label>
        <input type='password'  ></input>
        <button className='buttonA btn_save'>Save</button>
      </div>
    </div>
  </div>;
  {loading && <Loader type='line-scale-pulse-out-rapid' />}
    </>
};

export default Settings;
