const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const kmeans = require('node-kmeans');
const { restart } = require("nodemon");

function generateClusters(data){
    let result = {};
    kmeans.clusterize(data, {k: 5}, (err,res) => {
        if (err) console.error(err);
        else console.log('%o',res);
        result = res;
    });
    return result;
}

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
        //console.log(result);
        res.send(result);
    });
});

app.get("/api/getPid", (req, res) => {
    const sqlSelect = "SELECT MAX(patient.pid) AS maxPid FROM patient";
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
});
/*
app.get("/information", (req, res) => {
    const givenData = req.query.arrayV;
    console.log(req.query.arrayV);
    
    kmeans.clusterize([ [1,2,1], [1,2,1], [1,2,6], [6,5,3], [7,4,2], [7,3,1] ], {k: 5}, (error,result) => {
        if (error) console.error(error);
        else //console.log('%o',result);
        res.send("result");
    });
})*/

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


app.get("/api/get/conditions", (req,res) => {
    const sqlGet = "SELECT patient_id, last_visit, diseases, health_issues, medication_prescribed, labtest_results, mr_ct_indication, followup_visit FROM conditions;";
    db.query(sqlGet, (err, result) => {
        if (err) throw err;
        // console.log(result);

        let indexMap = {};
        for (let j = 0; j < result.length; j++){
            indexMap[j] = result[j]['patient_id'];
        }

        let vectors = [];
        for (let i = 0 ; i < result.length ; i++) {
            vectors[i] = [ result[i]['diseases'], result[i]['health_issues'], result[i]['medication_prescribed'], result[i]['labtest_results'], result[i]['mr_ct_indication'],];
        }

        let clusterIndex = {};
        let patientIndex = [ [], [], [], [], []];
        let patientInfo = [[],[],[],[],[]];
        kmeans.clusterize(vectors, {k: 5}, (err1,res1) => {
            if (err1) console.error(err1);
            else // console.log('%o',res1);
            for(var i = 0; i < res1.length; i++){
                clusterIndex[i] = res1[i].clusterInd;
            }
            // console.log("Here: ", clusterIndex);

            for(var j = 0; j < res1.length; j++){
            // console.log("j : ", j);
            // console.log("len : ",clusterIndex[j].length);
                for(var k = 0; k < clusterIndex[j].length; k++){
                    // console.log("RUNN",patientData.indexMap[clusterIndex[j][k]]);
                    patientIndex[j][k] = indexMap[clusterIndex[j][k]];
                    // console.log(patientIndex[j][k]);
                }
            }
            // console.log("PATIENT : ", patientIndex);

            async function storePat(i, inf){
                let givenPid = inf;
                const sqlSelect = "SELECT * FROM patient WHERE patient.pid=?";

                return new Promise((resolve, reject) => {
                    db.query(sqlSelect, [givenPid], (err2, result2) => {
                        if (err2) throw err2;
                        // console.log("result2" , result2);
                        patientInfo[i].push(result2[0]);
                        resolve();
                    });
                  });
            }

            async function runQueries(){
                for(var h = 0; h < patientIndex.length; h++){
                    for(var n = 0; n < clusterIndex[h].length; n++){
                        let info = patientIndex[h][n];
                        // get the patient and store it in the cluster in patienInfo
                        await storePat(h, info);
                    }
                }
                // console.log("INFO FROM RUN QUERIES : ", patientInfo);
                res.send(patientInfo);
            }
            runQueries();

        });

    });
});

app.listen(
    3001, () => {
        console.log("running on port 3001");
    }
);