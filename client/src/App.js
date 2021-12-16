import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button'
import { CssBaseline } from '@material-ui/core';

import HomeLayout from './components/HomeLayout';
import NavBar from './components/NavBar';

class App extends Component {
  render(){
    return (
      <div className="App">
        <CssBaseline />
        
        <NavBar />
      </div>
    );
  }
  
}

export default App;
