const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


//==============================
// POST
//==============================
const insertDocument = function (req, db, callback) {
    // Get the documents collection
    const collection = db.collection('vis');
    req.body.time = new Date();
    req.body.average = 0;
    req.body.rates =[];
    // Find some documents
    collection.insertOne(req.body, function(err, r) {
        assert.equal(null, err);
        callback(req.body);
    });
}

function postVista(req, callback) {
    // Connection URL
    const url = process.env.URL_MONGO;
    // Database Name
    const dbName = 'vega';
    // Use connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        insertDocument(req, db, (data)=>{
            callback(data);
            client.close();
        });
    });
}

app.post('/vis', (req, res) => {   
    postVista(req, (data)=> res.send(data));
});

//==============================
// GET
//==============================
const findDocuments = function (namep, db, callback) {
    // Get the documents collection
    const collection = db.collection('vis');
    // Find some documents
    collection.find({name: namep}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records", docs.length);
        callback(docs);
    });
}

function getConsulta(name, callback) {
    // Connection URL
    const url = process.env.URL_MONGO;
    // Database Name
    const dbName = 'vega';
    // Use connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        findDocuments(name, db, (data)=>{
            callback(data);
            client.close();
        });
    });
}

app.get('/vis/:name', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let name = req.params.name;
    getConsulta(name, (data)=> res.send(data));
});

module.exports = app;