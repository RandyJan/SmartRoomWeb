// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Home from './components/Home';
import Settings from './components/Settings';
import Logs from './components/Logs';
import Login from './components/Login';

import './App.scss'; // Importing CSS for overall layout

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* <Sidebar /> */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
