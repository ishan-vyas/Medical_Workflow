const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'medical_workflow'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM patient";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/api/getPid", (req, res) => {
    const sqlSelect = "SELECT MAX(patient.pid) AS maxPid FROM patient";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.get("/api/get/info", (req, res) => {
    console.log(req.query.id);
    givenPid = parseInt(req.query.id);
    const sqlSelect = "SELECT * FROM patient, conditions WHERE patient.pid=? AND conditions.patient_id=?;";
    db.query(sqlSelect, [givenPid, givenPid], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    givenPid = req.body.pid;
    givenSin = req.body.sin;
    givenName = req.body.name;
    givenAge = req.body.age;
    givenAddress = req.body.address;
    givenPhone = req.body.phone;
    givenLastVisit = req.body.last_visit;
    givenDisease = req.body.disease;
    givenHealthIssue = req.body.health_issue;
    givenMedication = req.body.medication_prescribed;
    givenLabTest = req.body.labtest_result;
    givenMRCT = req.body.mr_ct_indication;
    givenFollowUp = req.body.follow_up_visit;

    const sqlInsertPatient = 
        "INSERT INTO patient (pid, sin, name, age, address, phone) VALUES (?,?,?,?,?,?);";
    const sqlInsertConditions = 
        "INSERT INTO conditions (patient_id, last_visit, diseases, health_issues, medication_prescribed, labtest_results, mr_ct_indication, followup_visit) VALUES ((SELECT patient.pid FROM patient WHERE patient.sin=?),?,?,?,?,?,?,?);"
    db.query(sqlInsertPatient, [givenPid, givenSin, givenName, givenAge, givenAddress, givenPhone], (err, result) => {
        if (err) throw err;
        console.log(result);
    });
    db.query(sqlInsertConditions, [givenSin, givenLastVisit, givenDisease, givenHealthIssue, givenMedication, givenLabTest, givenMRCT, givenFollowUp], (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    
});

/*
app.get("/", (req,res) => {
    const sqlInsert = "INSERT INTO disease (name) VALUES ('infection');";
    const sqlDelete = "DELETE FROM disease WHERE dsid = 3;";
    db.query(sqlDelete, (err, result) => {
        if (err) throw err;
        console.log("Result: " + result);
        res.send("hello world this is my name jhjh");
    });
});*/

app.listen(
    3001, () => {
        console.log("running on port 3001");
    }
);