import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    inputField: {
        margin: "1%",
    },
  }));

function PatientForm(props){

    const classes = useStyles();

    const [enteredSIN, setEnteredSIN] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [enteredAddress, setEnteredAddress] = useState(null);
    const [enteredPhone, setEnteredPhone] = useState('');


    const sinChangeHandler = (e) => {
        setEnteredSIN(e.target.value);
    };

    const nameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    };

    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    };

    const addressChangeHandler = (e) => {
        setEnteredAddress(e.target.value);
    };

    const phoneChangeHandler = (e) => {
        setEnteredPhone(e.target.value);
    };

    function submitHandler(event){
        event.preventDefault();
        if(enteredAddress == ''){
            setEnteredAddress(null);
        }
        const patientData = {
            sin: enteredSIN,
            name: enteredName,
            age: enteredAge,
            address: enteredAddress,
            phone: enteredPhone
        };
        props.onSavePatientData(patientData);
        setEnteredSIN('');
        setEnteredName('');
        setEnteredAge('');
        setEnteredAddress('');
        setEnteredPhone('');
    }

    return (<form onSubmit={submitHandler}>
        <div>
            <div class={classes.inputField}>
                <TextField
                    required
                    id="filled-required"
                    label="SIN"
                    type="number" 
                    value={enteredSIN} 
                    onChange={sinChangeHandler}
                    size="small"
                    fullWidth
                />
            </div>
            <div class={classes.inputField}>
                <TextField
                    required
                    id="filled-required"
                    label="Name"
                    type="text" 
                    value={enteredName} 
                    onChange={nameChangeHandler}
                    size="small"
                    fullWidth
                />
            </div>
            <div class={classes.inputField}>
                <TextField
                    required
                    id="filled-required"
                    label="Age"
                    type="number" 
                    value={enteredAge} 
                    onChange={ageChangeHandler}
                    size="small"
                    fullWidth
                />
            </div>
            <div class={classes.inputField}>
                <TextField
                    id="filled"
                    label="Address"
                    type="text" 
                    multiline
                    rows={4}
                    value={enteredAddress} 
                    onChange={addressChangeHandler}
                    size="small"
                    fullWidth
                />
            </div>
            <div class={classes.inputField}>
                <TextField
                    required
                    id="filled-required"
                    label="Phone Number"
                    type="number" 
                    value={enteredPhone} 
                    onChange={phoneChangeHandler}
                    size="small"
                    fullWidth
                />
            </div>
        </div>
        <div>
            <div class={classes.inputField}>
                <Button type="submit" variant="contained" color="primary">Add Patient</Button>
            </div>
        </div>
    </form>)
}

export default PatientForm;