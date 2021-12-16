import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import { CssBaseline } from '@material-ui/core';
import HomeLayout from './components/UI/HomeLayout';
import NavBar from './components/UI/NavBar';
import Patient from './components/Patient/Patients';
import NewPatient from './components/NewPatient/NewPatient';

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
  const [currentPage, setCurentPage] = useState(1);
  const paitentsPerPage = 5;

  const addPatientHandler = patient => {
    Axios.post("http://localhost:3001/api/insert", patient)
    
    setPatientsList([...patientsList, patient]);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log("DATA FROM SQL")
      console.log(response.data);
      console.log("DATA FROM PATIENTS")
      //console.log(patients1);
      setPatientsList(response.data);
    })
  }, []);

  // Get Currnt posts
  const indexOfLastPatient = currentPage * paitentsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - paitentsPerPage;
  const currentPatients = patientsList.slice(indexOfFirstPatient, indexOfLastPatient);

  console.log(paitentsPerPage);
  console.log(patientsList.length);

  const paginate = (pageNumber) => {
    setCurentPage(pageNumber);
  };

    return (
      <div className="App">
        <CssBaseline />
        <NavBar />
        <NewPatient onAddPatient={addPatientHandler}/>
        <Patient items={currentPatients} ppp={paitentsPerPage} tP={patientsList.length} paginate={paginate} />
      </div>
    );
}

export default App;
