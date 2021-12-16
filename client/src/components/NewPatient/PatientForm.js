import React, { useState } from "react";

function PatientForm(props){

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
            <div>
                <label>SIN</label>
                <input type="number" value={enteredSIN} onChange={sinChangeHandler}></input>
            </div>
            <div>
                <label>Name</label>
                <input type="text" value={enteredName} onChange={nameChangeHandler}></input>
            </div>
            <div>
                <label>Age</label>
                <input type="number" value={enteredAge} onChange={ageChangeHandler}></input>
            </div>
            <div>
                <label>Address</label>
                <input type="text" value={enteredAddress} onChange={addressChangeHandler}></input>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="number" value={enteredPhone} onChange={phoneChangeHandler}></input>
            </div>
        </div>
        <div>
            <div>
                <button type="submit">Add Patient</button>
            </div>
        </div>
    </form>)
}

export default PatientForm;