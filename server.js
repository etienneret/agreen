var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('port',(process.env.PORT || 3000));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


/********************/

app.use(require('./routes/routes')); 

app.listen(app.get('port'));