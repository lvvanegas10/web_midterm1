const express = require('express');
const app = express();
const path = require('path');

//================================
// Requirements files
//================================
require('./config/config');
app.use(require('./routes/index'));
app.use(require('./middleware/index'));

//================================
// Static
//================================
app.use(express.static(path.join(__dirname, './front/build')));


//================================
// Static
//================================
app.listen(process.env.PORT, ()=> {
    console.log('Server on port', process.env.PORT);
})