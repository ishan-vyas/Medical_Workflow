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

    givenSin = req.body.sin;
    givenName = req.body.name;
    givenAge = req.body.age;
    givenAddress = req.body.address;
    givenPhone = req.body.phone;

    const sqlInsert = "INSERT INTO patient (sin, name, age, address, phone) VALUES (?,?,?,?,?);";
    db.query(sqlInsert, [givenSin, givenName, givenAge, givenAddress, givenPhone], (err, result) => {
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

// app.get("/api/get/clusters", (req, res) => {
//     // console.log("iAM HERS");
//     // const sqlSelect1 = "CALL kmeans_medical(5)";
//     // db.query(sqlSelect1, (err, result) => {
//     //     console.log("QUERY 1");
//     //     if (err){
//     //         console.log(err);
//     //         throw err;
//     //     } 
//     //     console.log(result);
//     // });
    
    
//     // const sqlSelectClusters = "SELECT * FROM conditions GROUP BY cluster_id";
//     // db.query(sqlSelectClusters, (err, result) => {
//     //     console.log("QUERY 2");
//     //     if (err){
//     //         console.log(err);
//     //         throw err;
//     //     }
//     //     console.log(result);
//     //     res.send(result);
//     // });

// });

app.listen(
    3001, () => {
        console.log("running on port 3001");
    }
);