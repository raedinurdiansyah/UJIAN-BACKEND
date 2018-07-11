var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://raedi:1234@localhost:27017/dataCPU';

const os = require('os');

var namaCPU = os.hostname();
var osTipe = os.type();
var osPlatform = os.platform();
var osRilis = os.release();
var ramSisa = os.freemem();
var ramTotal = os.totalmem();


MongoClient.connect(url, (err, db)=>{
    console.log("Terhubung ke MongoDB!");
});




app.post('/data', (req, res)=>{
    MongoClient.connect(url, (err, db)=>{
        var datainput = {namacpu: namaCPU, tipe: osTipe,
                        platform: osPlatform, rilis: osRilis,
                        ramSisa: ramSisa, ramTotal: ramTotal};
        var collection = db.collection('data');
        collection.insert(datainput, (err, result)=>{
            console.log(result);
            res.send(result);
        });
    });
})

app.get('/data', (req, res) => {
    MongoClient.connect(url, (err, db) => {
        var collection = db.collection('data');
        collection.find({}).toArray((err, result) => {
            console.log(result);
            res.send(result);
        });
    });
})

app.listen(3210, ()=>{
    console.log('Server aktif @port 3210')
});