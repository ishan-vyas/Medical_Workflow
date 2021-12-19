import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Box, CssBaseline } from '@material-ui/core';
import NavBar from '../UI/NavBar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'

// To be changes for getting data from cluster
function DoctorPage () {
  const [patientConditions, setPatientConditions] = useState({});
  const parameters = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/conditions").then((response) => {
      console.log(response.data);
      setPatientConditions(response.data);
    });
  }, []);

  function generateArray(){

    let indexMap = {};
    for (let j = 0; j < patientConditions.length; j++){
      indexMap[j] = patientConditions[j]['patient_id'];
    }
    // console.log(indexMap);

    let vectors = [];
    for (let i = 0 ; i < patientConditions.length ; i++) {
      vectors[i] = [ patientConditions[i]['last_visit'], patientConditions[i]['diseases'], patientConditions[i]['health_issues'], patientConditions[i]['medication_prescribed'], patientConditions[i]['labtest_results'], patientConditions[i]['mr_ct_indication'], patientConditions[i]['followup_visit'],];
    }
    // console.log(vectors);

    Axios.get("http://localhost:3001/information", { params: {arrayV: vectors} }).then((response) => {
      console.log(response);
    });
  }

  return (
  <div>
      <CssBaseline />
      <NavBar />
      <div>
        <Button variant="contained" color="primary" onClick={generateArray}>Generate Clusters</Button>
        <Button variant="contained" color="primary">Generate Schedule</Button>
      </div>
      <div>
          
      </div>
  </div>
  );
}

export default DoctorPage;