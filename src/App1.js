// src/App.js
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import'./App.css';
import React, { useState } from 'react'; // Correct

const App = () => {
  return (
    <div>
      {/* <Login /> */}
      <Register />
    </div>
  );
};

export default App;
