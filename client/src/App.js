import React, { Component, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import { CssBaseline } from '@material-ui/core';
import HomeLayout from './components/UI/HomeLayout';
import NavBar from './components/UI/NavBar';
import Patient from './components/Patient/Patients';
import NewPatient from './components/NewPatient/NewPatient';
import PatientInfo from './components/Patient/PatientInfo';
import Home from './Home';

function App() {

    return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PatientInfo/:pid" element={<PatientInfo />} />
      </Routes>
    </Router>
    );
}

export default App;
