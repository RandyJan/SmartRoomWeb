// src/components/Login.js
import React, { useState } from 'react';
import './Login.scss';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
  };

  return (
    <div className='container'>

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
      <button type="submit" className='buttonA'>Register</button>

      </div>
    </form>
    </div>
    </div>

  );
};

export default Login;
