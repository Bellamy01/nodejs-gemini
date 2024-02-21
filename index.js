const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello from the Google Client Side!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});