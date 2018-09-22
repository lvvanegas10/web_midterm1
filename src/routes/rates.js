const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


//==============================
// RATES
//==============================
const updateDocument = function (namep, req, db, callback) {
    // Get the documents collection
    const collection = db.collection('vis');
    collection.find({ name: namep }).toArray(function (err, docs1) {
        assert.equal(err, null);
        let docs = JSON.parse(JSON.stringify(docs1[0]));
        docs.rates.push(req.body);
        collection.findOneAndUpdate({ name: namep }, { $set: { rates: docs.rates } }, {
            returnOriginal: false,
            upsert: true
        });
        console.log(docs.average)
        console.log( req.body.rate)
        console.log(docs.rates.length)
        docs.average = (docs.average + req.body.rate)/ (docs.rates.length);
        
        console.log(docs.average)

        collection.findOneAndUpdate({ name: namep }, { $set: { average: docs.average } }, {
            returnOriginal: false,
            upsert: true
        });
        collection.find({ name: namep }).toArray(function (err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    });
}

function putVista(name, req, callback) {
    // Connection URL
    const url = process.env.URL_MONGO;
    // Database Name
    const dbName = 'vega';
    // Use connect method to connect to the server
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        updateDocument(name, req, db, (data) => {
            callback(data);
            client.close();
        });
    });
}

app.put('/vis/:name', (req, res) => {
    let name = req.params.name;
    putVista(name, req, (data) => res.send(data));
});

module.exports = app;