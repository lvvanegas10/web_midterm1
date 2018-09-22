const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(bodyParser.json())

//================================
// Requirements files
//================================
require('./config/config');
app.use(require('./routes/index'));
app.use(require('./middleware/index'));
app.use(express.json());


//================================
// Static
//================================
app.use('/',express.static(path.join(__dirname, '../front/build')));

//================================
// Static
//================================
app.listen(process.env.PORT, ()=> {
    console.log('Server on port', process.env.PORT);
})