import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import { Box, CssBaseline } from '@material-ui/core';
import NavBar from '../UI/NavBar';
import { red } from '@material-ui/core/colors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './PatientInfo.module.css';
import MinorImg from "../Images/MinorMR.jpeg";
import MajorImg from "../Images/MajorMR.jpeg";
import NoneImg from "../Images/NoneMR.jpeg";
import UpdatePatient from "../UpdatePatient/UpdatePatient";

const diseases = {
  1: "Diabetes",
  2: "Cancer",
  3: "Flu",
  4: "AIDS",
  5: "HIV",
  6: "None",
};

const health_issues = {
  1: "Breathing Difficulties",
  2: "Blood Pressure",
  3: "Cholesterol",
  4: "None",
};

const medication_prescribed = {
  1: "Yes",
  2: "No"
};

const labtest_results = {
  1: "Severe",
  2: "Moderate",
  3: "Mild",
  4: "None",
};

const mr_ct_indication = {
  1: "Major Issue",
  2: "Minor Issue",
  3: "None",
};

function myToDate(num) {
  num = num.toString();
  const newDate = num.substring(0, 4) + '/' + num.substring(4, 6) + '/' + num.substring(6, 8);
  console.log('newDate in string', newDate);
  return newDate;
}

function PatientInfo () {

  const [patientInfo, setPatientInfo] = useState({});
  const [updateBool, setUpdateBool] = useState(0);
  const [notifications, setNotifications] = useState(["No Notifications"]);
  const [dateLV, setDateLV] = useState('');
  const [dateFV, setDateFV] = useState('');
  const parameters = useParams();

  // const classes = useStyles();

  useEffect(() => {
    let info = { id: parameters.pid };
    console.log(notifications);
    Axios.get("http://localhost:3001/api/get/info", {params: info}).then((response) => {
      setPatientInfo(response.data[0]);
      checkNotifications(response.data[0].last_visit,response.data[0].followup_visit);
      setDateLV(myToDate(response.data[0].last_visit));
      setDateFV(myToDate(response.data[0].followup_visit));
    });
  }, [updateBool]);

  const updatePatientInfo = (updatedInfo) => {
    const update = {
      ...updatedInfo,
      pid: patientInfo.patient_id
    }
    Axios.put("http://localhost:3001/api/update", update).then((response) => {
      setUpdateBool(updateBool+1);
    });
    window.location.reload(false);
  };

  function checkNotifications(LV, FV){
    const LVdate = new Date();
    const FVdate = new Date();
    const todayDate = new Date();
    LVdate.setFullYear(parseInt(LV.toString().substring(0,4)));
    LVdate.setMonth(parseInt(LV.toString().substring(4,6))-1);
    LVdate.setDate(parseInt(LV.toString().substring(6,8)));
    FVdate.setFullYear(parseInt(FV.toString().substring(0,4)));
    FVdate.setMonth(parseInt(FV.toString().substring(4,6))-1);
    FVdate.setDate(parseInt(FV.toString().substring(6,8)));
    if(todayDate > FVdate){
      setNotifications(["Patient missed followup visit","***ATTENTION REQUIRED***"]);
    }else if(todayDate.getDate() >= (FVdate.getDate() - 2)){
      setNotifications(["Upcoming followup visit", "**REMIND PATIENT**"]);
    }
    
  }

  // console.log(patientInfo.medication_prescribed);

  return (
  <div>
      <CssBaseline />
      <NavBar />
      <div>
        <div className={styles.main_info_container}>
          <div className={styles.patient_pic}>
            {/* <Avatar aria-label="recipe" className={classes.avatar}>
              {getInitials2(patientInfo.name)}
            </Avatar> */}
            <AccountCircleIcon className='avatar' style={{ fontSize: 100, color: red[500] }}/>
          </div>
          <div className={styles.pat_inf}>
            <h1>Patient: {patientInfo.patient_id}</h1>
            <p><b>Name:</b> {patientInfo.name}</p>
            <p><b>Age:</b> {patientInfo.age}</p>
            <p><b>Address:</b> {patientInfo.address}</p>
          </div>
          <div className={styles.pat_inf}>
            
            <p><b>SIN:</b> {patientInfo.sin}</p>
            <p><b>Phone Number:</b> {patientInfo.phone}</p>
            <p><b>Last Visit Date: </b>{dateLV}</p>
            <p><b>Follow-Up Visit Date: </b>{dateFV}</p>
          </div>
        </div>
        
        <div className={styles.data_container} >
          <div>
            <div>
              <h1>Patient Data</h1>
            </div>
            <p>Diseases: {diseases[patientInfo.diseases]}</p>
            <p>Health Issues: {health_issues[patientInfo.health_issues]}</p>
            <p>Medication Prescribed: {medication_prescribed[patientInfo.medication_prescribed]}</p>
            <p>Lab Test Results: {labtest_results[patientInfo.labtest_results]}</p>
            <p>MRI/CT Scan Indications: {mr_ct_indication[patientInfo.mr_ct_indication]}</p>
            <p><b>Notifications:</b></p>
            <ul>
              {notifications.map((n) => {
                return <li>{n}</li>
              })}
            </ul>
            <p><b>MR/CT Scan:</b></p>
            <Box className="CTImg">
              <img
                src={ (patientInfo.mr_ct_indication === 1)
                  ? MajorImg
                  : ((patientInfo.mr_ct_indication === 2)
                    ? MinorImg : NoneImg)
                }
                
                alt={mr_ct_indication[patientInfo.mr_ct_indication]}
              />
            </Box>
            <UpdatePatient onAddPatient={updatePatientInfo}/>
          </div>  
        </div>
      </div>
  </div>
  );
}

export default PatientInfo;