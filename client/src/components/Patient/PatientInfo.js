import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import { CssBaseline } from '@material-ui/core';
import NavBar from '../UI/NavBar';

function PatientInfo () {

  const [patientInfo, setPatientInfo] = useState('');
  const parameters = useParams();

  useEffect(() => {
    let info = { id: parameters.pid };
    console.log(info);
    Axios.get("http://localhost:3001/api/get/info", {params: info});
  }, []);

  return (
  <div>
      <CssBaseline />
      <NavBar />
      <h1>PatientInfo</h1>
  </div>
  );
}

export default PatientInfo;