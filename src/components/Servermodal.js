import './Servermodal.scss';
import React, { useState,useEffect } from 'react';

const Servermodal = ({ isOpen, onClose }) => {
    const[server,setServer]=useState('');
    const handleInputChange = (e) => {
        setServer(e.target.value); // Update state with input value
      };
      const saveServer= ()=>{
        localStorage.setItem('serverCreds',server);
        onClose();
      }
  if (!isOpen) return null;
    
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Input Server Endpoint</h3>
        <p>Current: {server}</p>
        <input type="text" placeholder="Ex. 192.168.12.9:9090" onChange ={handleInputChange}/>
        <button className='buttonA' onClick={saveServer} >Enter</button>
      </div>
    </div>
  );
};

export default Servermodal;
