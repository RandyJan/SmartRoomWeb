// src/components/Register.js
import React, { useState } from 'react';
import './Register.scss';
const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', { email, password });
  };

  return (
        <div className='container'>
            <div className='RegDiv'>
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className='inputCont'>
        <label>Name:</label>
      <div>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
        <label>Email:</label>
      <div>
        <input 
          type="email" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <label>Password:</label>
      <div>
        <input 
          type="password" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
        <label>Confirm password:</label>
      <div>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
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
