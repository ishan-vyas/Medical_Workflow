import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import { CssBaseline } from '@material-ui/core';

import HomeLayout from './components/HomeLayout';
import NavBar from './components/NavBar';
import Patient from './components/Patients';

/*
const patients1 = [
  {
    pid: 1,
    sin: 123,
    name: "Kevin",
    age: 21,
    address: null,
    phone: 1234567891
  },
  {
    pid: 2,
    sin: 124,
    name: "Nicole",
    age: 22,
    address: null,
    phone: 1234567892
  },
  {
    pid: 3,
    sin: 125,
    name: "Cathy",
    age: 21,
    address: null,
    phone: 1234567893
  },
];
*/

function App() {

  const [patientsList, setPatientsList] = useState([]);
  let patients = [{}];

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log("DATA FROM SQL")
      console.log(response.data);
      console.log("DATA FROM PATIENTS")
      //console.log(patients1);
      setPatientsList(response.data);
    })
  }, [])

    return (
      <div className="App">
        <CssBaseline />
        <NavBar />
        <Patient items={patientsList}/>
      </div>
    );
}

export default App;
