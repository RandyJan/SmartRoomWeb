// src/components/Register.js
import React, { useState } from 'react';
import './Register.scss';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[position,setPos]=useState('');
  const[name,setName]=useState('');
  const [cPassword, setCPassword] = useState('');
  const navigate = useNavigate();
  const serverCreds = localStorage.getItem('serverCreds');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password != cPassword){
      alert("Password doesnt match!");
      return;
    }
    try {
      const response = await axios.post('http://'+serverCreds+'/api/accessRegis', {
        email,
        password,
        position,
        name,
      });
      console.log(serverCreds);
      localStorage.setItem('session', 1);
      localStorage.setItem('userLogin', response.data.data);
      navigate('/')
      console.log('User:', response.data);
    } catch (err) {
      console.log(err)
      setError('Invalid credentials. Please try again.');
    }
    console.log('Register:', { email, password });
  };
  const handleReturn = ()=>{
    navigate('/login');
  }
  return (
        <div className='container'>
      <h1>TERESA ORSINI HOMES</h1>

            <div className='RegDiv'>
          <div className='btn_return' onClick={handleReturn}><FontAwesomeIcon icon ={faArrowLeft}  /></div>
    <form onSubmit={handleSubmit}>
    {error && <p className="error">{error}</p>}

      <h2>Register</h2>
      <div className='inputCont'>
        <label>Name:</label>
      <div>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div><label>Position:</label>
      <div>
        <input 
          type="text" 
          value={position} 
          onChange={(e) => setPos(e.target.value)} 
          required 
        />
      </div>
        <label>Email:</label>
      <div>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <label>Password:</label>
      <div>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
        <label>Confirm password:</label>
      <div>
        <input 
          type="password" 
          value={cPassword} 
          onChange={(e) => setCPassword(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className='buttonA'>Register</button>
      </div>
    </form>
    </div>
    </div>
  );
};

export default Register;
