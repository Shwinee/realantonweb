const express = require('express');
const app = express();
const Datastore = require('nedb');
const { request, response } = require('express');

const port = process.env.PORT || 3000

app.listen(port, () => console.log('running at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log("request sent");
    const data = request.body;
    database.insert(data);
    console.log(request.body);
    response.json({
        status: 'message sent',
        text: data
    })
});

app.get('/api', (request, response) => {
    database.find({}, (error, data) => {
        response.json(data);
    });
})