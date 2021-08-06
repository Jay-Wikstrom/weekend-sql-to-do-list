const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/router');
const PORT = 5000;

//Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// Serve back static files by default
app.use(express.static('server/public'))

//Routes
app.use('/todo', router);

//Start listening for requests on port 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT)
})