require('dotenv').config();
const express = require('express');
const massive = require('massive');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5050;
const { CONNECTION_STRING } = process.env;

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join('../build')));

// ACTIVATE MASSIVE
massive({
    connectionString: process.env.DATABASE_URL || CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then((db) => {
    app.set('db', db);
    console.log(`Database connection established successfully!`);
}).catch(err => {
    console.log(`Error connecting DB: ${err}`);
})

// ENDPOINTS
// app.get('/api/', readAll);


// ACTIVATE SERVER
app.listen(PORT, () => console.log(`Lilstening on port: ${PORT}`));