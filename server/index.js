const express = require("express");
const app = express();
const mysql = require("mysql");

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


app.get("/", (req,res) => {
    const sqlInsert = "INSERT INTO disease (name) VALUES ('infection');";
    const sqlDelete = "DELETE FROM disease WHERE dsid = 3;";
    db.query(sqlDelete, (err, result) => {
        if (err) throw err;
        console.log("Result: " + result);
        res.send("hello world this is my name jhjh");
    });
});

app.listen(
    3001, () => {
        console.log("running on port 3001");
    }
);