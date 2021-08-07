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

//Create a connection "pool" to postgres DB
const pool = new pg.Pool(config);


//GET 
router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "todo"
        ORDER BY "task"
    `;

    //Send db results to the client
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
        "todo"("task", "complete")
    VALUES
        ($1, $2)
    `;
    let sqlParams = [
        req.body.task,              //$1
        req.body.complete           //$2
    ];
    console.log('sqlQuery', sqlQuery);

    //Send the query to the DB
    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201); //Created
        })
        .catch((error) => {
            console.log('SQL failed', error);
            res.sendStatus(500);
        });
});

//PUT 
router.put('/:id', (req, res) => {
    console.log('params', req.params);
    console.log('complete param', req.body.isComplete);

    //SET "complete = req.body.complete
    // WHERE id = req.params.id
    let sqlQuery = `
        UPDATE "todo" 
        SET "complete" = $1 
        WHERE id = $2;
  `;

    let sqlParams = [
        req.body.isComplete, // $1
        req.params.id  // $2
    ]

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            console.log('Send complete', dbRes);
            res.send(201);
        })
        .catch((error) => {
            console.log("post error", error);
            res.sendStatus(500);
        });
});

//DELETE
router.delete('/:id', (req, res) => {
    const idToDelete = req.params.id
    console.log(idToDelete)
    let sqlQuery = `
        DELETE FROM "todo" 
        WHERE id=$1
    `;
    
    let sqlParams = [idToDelete]
    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log('DELETE error', err)
            res.sendStatus(500)
        })
});

module.exports = router;