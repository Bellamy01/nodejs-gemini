const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routers = require('./routers/geminiRouter');

dotenv.config();

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Hello from the Google Client Side!');
});

app.use('/api/v1/', routers);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});