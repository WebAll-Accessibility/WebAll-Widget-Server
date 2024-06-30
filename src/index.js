const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');

require('dotenv').config();


// Ugly global variables
const service = express();

const databaseConnection = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});


// Express setup
service.use(express.json());
service.use(cors());


// Utility functions
const checkUser = (referrer, callback) => {
    databaseConnection.query(`
    SELECT a.*, b.max_hits, b.max_yearly_hits, b.price_per_req
    FROM Subscriptions a
    INNER JOIN Plans b ON a.id_plan = b.id_plan
    WHERE a.domain = ?`,
    referrer, (err, result, fields) => {
        if (err) throw err;
        databaseConnection.query(`
        UPDATE Subscriptions
        SET num_hits = num_hits + 1, num_yearly_hits = num_yearly_hits + 1
        WHERE id_customer = ?
        `, referrer, (err, ignored, fields) => {
            callback(result)
        });
    });
}

service.get('/', (req, res) => {
    if (!fs.existsSync(path.join(__dirname, `.${req.path}`))) {
        res.status(404).end();
        return;
    }

    let file = fs.readFileSync(path.join(__dirname, `.{req.path}`), 'utf8');
    file = file.replaceAll('__WA_SERVER_ADDRESS', process.env.WA_SERVER_ADDRESS);

    switch (req.path.split('.')[1]) {
        case 'css':
            res.setHeader('Content-Type', 'text/css');
            break;
        case 'html':
            res.setHeader('Content-Type', 'text/html');
            break;
        case 'js':
            res.setHeader('Content-Type', 'text/javascript');
            break;
    }

    res.send(file);
});

service.get('/service/*', (req, res) => {
    let referrer = req.get('Referrer');

    if (!referrer) {
        res.status(403).end();
        return;
    }

    referrer = referrer.replaceAll('http://', '');
    referrer = referrer.replaceAll('https://', '');
    referrer = referrer.split('/')[0];
    referrer = referrer.split(':')[0];
    referrer = referrer.replaceAll(' ', '');

    checkUser(referrer, (user) => {
        if (!(user && user.length > 0)) {
            res.status(403).end();
            return;
        }
        
        if (!fs.existsSync(path.join(__dirname, `./${req.path}`))) {
            res.status(404).end();
            return;
        }

        let file = fs.readFileSync(path.join(__dirname, `./${req.path}`), 'utf8');
        file = file.replaceAll('__WA_SERVER_ADDRESS', process.env.WA_SERVER_ADDRESS);

        switch (req.path.split('.')[1]) {
            case 'css':
                res.setHeader('Content-Type', 'text/css');
                break;
            case 'html':
                res.setHeader('Content-Type', 'text/html');
                break;
            case 'js':
                res.setHeader('Content-Type', 'text/javascript');
                break;
        }

        res.send(file);
    });
});

service.listen(8080, () => {
    databaseConnection.connect((err) => {
        if (err) throw err;
    });
});
