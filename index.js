const scrapper = require('./src/scrapper');
const express = require('express');

const port = process.env.PORT || 3000
const app = express();

app.get('/api', (req, res) => {
    const address = req.query.address;

    scrapper.scrape(address, { timeout: 10000 }).then(function (data) {
        res.json(data);
    })
});

app.get('*', (_, res) => {
    res.status(404).send('Invalid endpoint');
});

app.listen(port, () => {
    console.log('Server started and listening on port ' + port);
});