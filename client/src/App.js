import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Axios from 'axios'
import PatientInfo from './components/Patient/PatientInfo';
import Home from './Home';
import DoctorPage from './components/Doctor/DoctorPage';

function App() {

    return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PatientInfo/:pid" element={<PatientInfo />} />
        <Route path="/DoctorPage" element={< DoctorPage />}/>
      </Routes>
    </Router>
    );
}

export default App;
