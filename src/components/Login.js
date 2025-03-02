// src/components/Login.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserGear} from '@fortawesome/free-solid-svg-icons'; 
import './Login.scss';
import Servermodal from './Servermodal';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Savelogs from './Savelogs';


const Login = ({setAuth}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [server,setServer]=useState('');
  const [error, setError] = useState('');
  const serverCreds = localStorage.getItem('serverCreds');
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Login:', { email, password });
    try {
      const response = await axios.post('http://'+serverCreds+'/api/accessWeb', {
        email,
        password,
      });
      console.log(serverCreds);
      localStorage.setItem('session', 1);
      const creds = JSON.stringify(response.data.data)
      localStorage.setItem('userLogin', creds);
      navigate('/')
  const userCredentials = JSON.parse(localStorage.getItem('userLogin')) || [];
      var usern = userCredentials['name'];
      console.log('User:', response.data);
      // const res = await axios.post('http://'+serverCreds+'/api/saveLogs',{
      //   username:usern,
      //   activity:"Logged in."

      // });
      await Savelogs.saveLog(userCredentials['name'],'Logged in');
      setAuth(1);
    } catch (err) {
      console.log(err)
      setError('Invalid credentials. Please try again.');
    }
  };
  const handleRegister = ()=>{
    navigate('/register');
  }
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className='container'>
      <h1>TERESA ORSINI HOMES</h1>
    <div className='LoginDiv'>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className='inputCont'>
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
      <button type="submit" className='buttonA'>Login</button>
      <button type="button" className='buttonA' onClick={handleRegister}>Register</button>

      </div>
    </form>
    {error && <p className="error">{error}</p>}

   <div className='server-settings'> <div  onClick={handleOpenModal}><FontAwesomeIcon icon ={faUserGear}  /></div>
    </div>
    </div>
    <Servermodal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>

  );
};

export default Login;
