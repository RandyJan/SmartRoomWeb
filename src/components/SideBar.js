// src/components/Sidebar.js
import React, { useState,useEffect  } from 'react'; // Correct

import { Link } from 'react-router-dom';
import './SideBar.scss'; // Importing CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose,faHouse } from '@fortawesome/free-solid-svg-icons'; //

const Sidebar = ({a=false,onClose}) => {
 const [isActive, setIsActive] = useState(a);
   const[username,setUsername] = useState('');
     const[position,setPosition] = useState('');
   
 
 useEffect(() => {
    setIsActive(a);
}, [a]);

    const handleClick = () => {
    
        setIsActive(false); // Toggle the active state
    };
useEffect(()=>{
  const userCredentials = JSON.parse(localStorage.getItem('userLogin')) || [];
      setUsername(userCredentials['name']);
      setPosition(userCredentials['position']);
},[]);
  return (
    <div className={isActive ?'sidebar slide-in':'close'} >
        <div onClick={onClose}><FontAwesomeIcon icon ={faClose} size='2x' /></div>
      <h2><FontAwesomeIcon icon ={faHouse} size='2x' /> T O H</h2>
     
      <ul>
      <li>{username}</li>
      <li>{position}</li><br></br>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/logs">History</Link></li>
        {/* <li><Link to="/login">Log in</Link></li> */}

      </ul>
    </div>
  );
};

export default Sidebar;
