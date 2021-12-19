import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Box, CssBaseline } from '@material-ui/core';
import NavBar from '../UI/NavBar';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'

// To be changes for getting data from cluster
function DoctorPage () {
  const [patientData, setPatientData] = useState({});
  const parameters = useParams();

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/conditions").then((response) => {
      // console.log(response.data);
      setPatientData(response.data);
    });
  }, []);

  const getClusters = () => {
    let clusterIndex = {};
    for(var i = 0; i < patientData.clusters.length; i++){
      clusterIndex[i] = patientData.clusters[i].clusterInd;
    }
    console.log(clusterIndex);

    let patientIndex = [ [], [], [], [], []];
    for(var j = 0; j < patientData.clusters.length; j++){
      // console.log("j : ", j);
      // console.log("len : ",clusterIndex[j].length);
      for(var k = 0; k < clusterIndex[j].length; k++){
        // console.log("RUNN",patientData.indexMap[clusterIndex[j][k]]);
        patientIndex[j][k] = patientData.indexMap[clusterIndex[j][k]];
        // console.log(patientIndex[j][k]);
      }
    }
    console.log(patientIndex);

    let patientInfo = [[],[],[],[],[]];
    for(var h = 0; h < patientIndex.length; h++){
      //console.log(patientInfo[h]);
      for(var n = 0; n < patientIndex[h].length; n++){
        let info = { id: patientIndex[h][n] };
        Axios.get("http://localhost:3001/api/get/info", {params: info}).then((response) => {
          console.log(response.data[0]);
          //patientInfo[h].append(response.data[0]);
        });
      }
    }
    
    // console.log(clusterIndex);
    // console.log(patientIndex);
    // console.log(patientInfo);
  };

  return (
  <div>
      <CssBaseline />
      <NavBar />
      <div>
        <Button variant="contained" color="primary" onClick={getClusters}>Generate Clusters</Button>
        <Button variant="contained" color="primary">Generate Schedule</Button>
        <div>
          <h1>Cluster 1</h1>
        </div>
        <div>
          <h1>Cluster 2</h1>
        </div>
        <div>
          <h1>Cluster 3</h1>
        </div>
        <div>
          <h1>Cluster 4</h1> 
        </div>
        <div>
          <h1>Cluster 5</h1> 
        </div>
      </div>
      <div>
          
      </div>
  </div>
  );
}

export default DoctorPage;