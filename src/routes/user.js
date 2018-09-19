const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.json({
        nombre: 'hola'
    });
});



module.exports = app;