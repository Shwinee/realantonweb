const express = require('express');
const Datastore = require('nedb')
const { request, response, text } = require('express');
const app = express();
var fs = require('fs');


const database = new Datastore('database.db');
database.loadDatabase();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }));

app.post('/api', (request, response) => {
    console.log(request.body);
    const data = request.body;
    database.insert(data);
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lon
    });
    if (data.txtfile == true){
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