import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import { Box, CssBaseline } from '@material-ui/core';
import NavBar from '../UI/NavBar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'


// To be changes for getting data from cluster
function DoctorPage () {

//   const [patientInfo, setPatientInfo] = useState({});
//   const parameters = useParams();

//   const getClusters = () => {
//     console.log("running")
//     Axios.get("http://localhost:3001/api/get/clusters").then((response) => {
//       console.log(response.data);
//     });
//   };


  return (
  <div>
      <CssBaseline />
      <NavBar />
      <div>
        <Button variant="contained" color="primary">Generate Clusters</Button>
        <Button variant="contained" color="primary">Generate Schedule</Button>
      </div>
      <div>
          
      </div>
  </div>
  );
}

export default DoctorPage;