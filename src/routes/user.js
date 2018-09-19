const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('consulta');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records", docs.length);
        callback(docs);
    });
}

function getConsulta(callback) {
    // Connection URL
    const url = 'mongodb://localhost:27017';
    // Database Name
    const dbName = 'prueba';
    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        findDocuments(db, (data)=>{
            callback(data);
            client.close();
        });
    });
}

app.get('/getData', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    getConsulta((data)=> res.send(data));
});

module.exports = app;