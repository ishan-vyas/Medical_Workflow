import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import { CssBaseline } from '@material-ui/core';

import HomeLayout from './components/HomeLayout';
import NavBar from './components/NavBar';
import Patient from './components/Patients';

const patients = [
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

class App extends Component {

  render(){
    return (
      <div className="App">
        <CssBaseline />
        <NavBar />
        <Patient items={patients}/>
      </div>
    );
  }
  
}

export default App;
