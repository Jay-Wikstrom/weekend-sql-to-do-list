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

router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "todo"
    `;
    pool.query(sqlQuery)
        .then((dbRes) => {
            console.log('dbRes.rows', dbRes.rows);
            res.send(dbRes.rows);
        })
        .catch((error) => {
            console.log('error', error);
            res.sendStatus(500);
        });
});

//POST

router.post('/', (req, res) => {
    console.log('looking at req.body', req.body.task);

    let sqlQuery = `
    INSERT INTO 
        "todo"("task")
    VALUES
        ($1)
    `;
    let sqlParams = [
        req.body.task
    ]
    console.log('sqlQuery', sqlQuery);

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {

            res.sendStatus(201); //Created
        })
        .catch((error) => {

            console.log('SQL failed', error);
            res.sendStatus(500);

        });

})

//PUT



//DELETE


module.exports = router;