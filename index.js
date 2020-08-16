const express = require('express');
const Datastore = require('nedb')
const { request, response, text } = require('express');
const app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

const database = new Datastore('database.db');
database.loadDatabase();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('listening at '+port));
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
}) 
app.post('/message', (request, response) =>{
    database.insert(request);
})
app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    if (!data.name == ''){
        database.insert(data);
    }
    response.json({
        status: 'success'
    });
    if (!data.id == ''){
        console.log('removing: '+data.id);
        database.remove({ _id: data.id }, {}, function (err, numRemoved) {
            if (err){
                console.log('error')
            }
        });
    }
    if (data.txtfile == false){
        console.log('also making a .txt file...');
        if (data.gs == 'Set'){
            fs.writeFile('Reminders/set/'+data.name+'.txt', data.text, function (err){
    
            })
        }
        if (data.gs == 'General'){
            fs.writeFile('Reminders/general/'+data.name+'.txt', data.text, function (err){
    
            })
        }
    }

})
app.post('/txt', (request, response) => {
    console.log(request.body);
    const data = request.body;
    database.insert(data);
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    });
    if (body.txtfile == true){
        console.log('well okay then');
    }
})