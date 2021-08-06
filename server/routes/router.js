const express = require('express');
const router = express.Router();
const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);


//GET



//POST



//PUT



//DELETE


