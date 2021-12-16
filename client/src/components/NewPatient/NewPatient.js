import React from 'react';
import PatientForm from './PatientForm';

function NewPatient(props){

    const savePatientDataHandler = (enteredPatientData) => {
        const patientData = {
            ...enteredPatientData
        }
        props.onAddPatient(patientData);
    }

    return <div>
            <PatientForm onSavePatientData={savePatientDataHandler} />
        </div>
}

export default NewPatient;