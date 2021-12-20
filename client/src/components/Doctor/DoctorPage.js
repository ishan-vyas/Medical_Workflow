import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { CssBaseline } from '@material-ui/core';
import NavBar from '../UI/NavBar';
import Button from '@material-ui/core/Button';
import PatientItem from '../Patient/PatientItem';

// To be changes for getting data from cluster
function DoctorPage () {
  const [patientData, setPatientData] = useState({});
  const [showCluster, setShowCluster] = useState(false);
  const [disabledB, setDisabledB] = useState(true);

  console.log(patientData);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/conditions").then((response) => {
      console.log("HELLO", response.data);
      setPatientData(response.data);
      setDisabledB(false);
    });
  }, []);

  function getClusters(){
    setShowCluster(true);
  }

  function printCluster(i){
    return (patientData[i].map((item) => {
      return <PatientItem 
        key={item.pid}
        pid={item.pid}
        name={item.name}
        age={item.age}
    />
    }));
  }

  return (
  <div>
      <CssBaseline />
      <NavBar />
      <div>
        <Button variant="contained" color="primary" onClick={getClusters} disabled={disabledB}>Generate Clusters</Button>
        <div>
          <h1>Cluster 1</h1>
          {showCluster && printCluster(0)}
        </div>
        <div>
          <h1>Cluster 2</h1>
          {showCluster && printCluster(1)}
        </div>
        <div>
          <h1>Cluster 3</h1>
          {showCluster && printCluster(2)}
        </div>
        <div>
          <h1>Cluster 4</h1> 
          {showCluster && printCluster(3)}
        </div>
        <div>
          <h1>Cluster 5</h1> 
          {showCluster && printCluster(4)}
        </div>
      </div>
      <div>
          
      </div>
  </div>
  );
}

export default DoctorPage;