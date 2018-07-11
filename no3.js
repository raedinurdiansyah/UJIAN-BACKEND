var express = require('express');
var bodyParser = require('body-parser')
var app = express();
// var url = bodyParser.urlencoded({extended: false})
// app.set('view engine', 'ejs')
app.use(bodyParser.json());
var mysql = require('mysql');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
  password : 'kolorbabe13',
  database : 'toko'
});

db.connect();


app.post('/karyawan', (req, res)=>{

    var reqHari = req.body.tgllahir.substr(0, 2)
    var reqBulan = req.body.tgllahir.substr(3, 2)
    var reqTahun = req.body.tgllahir.substr(6, 4)

    var myzodiak = zodiak(reqHari, reqBulan)

    var date = new Date

    var tahun = date.getFullYear()

    function zodiak(hari, bulan) {

        var tipezodiak = {
            'aries': 'aries',
            'taurus': 'taurus',
            'gemini': 'gemini',
            'cancer': 'cancer',
            'leo': 'leo',
            'virgo': 'virgo',
            'libra': 'libra',
            'scorpio': 'scorpio',
            'sagitarius': 'sagitarius',
            'capricorn': 'capricorn',
            'aquarius': 'aquarius',
            'pisces': 'pisces'
        }
        if ((hari >= 21 && bulan == 3) || hari <= 19 && bulan == 4) {
            return tipezodiak.aries
        }
        else if ((hari >= 20 && bulan == 4) || hari <= 20 && bulan == 5) {
            return tipezodiak.taurus
        }
        else if ((hari >= 21 && bulan == 5) || hari <= 21 && bulan == 6) {
            return tipezodiak.gemini
        }
        else if ((hari >= 22 && bulan == 6) || hari <= 22 && bulan == 7) {
            return tipezodiak.cancer
        }
        else if ((hari >= 23 && bulan == 7) || hari <= 22 && bulan == 8) {
            return tipezodiak.leo
        }
        else if ((hari >= 23 && bulan == 8) || hari <= 22 && bulan == 9) {
            return tipezodiak.virgo
        }
        else if ((hari >= 23 && bulan == 9) || hari <= 22 && bulan == 10) {
            return tipezodiak.libra
        }
        else if ((hari >= 23 && bulan == 10) || hari <= 21 && bulan == 11) {
            return tipezodiak.scorpio
        }
        else if ((hari >= 22 && bulan == 11) || hari <= 21 && bulan == 12) {
            return tipezodiak.sagitarius
        }
        else if ((hari >= 22 && bulan == 12) || hari <= 19 && bulan == 1) {
            return tipezodiak.capricorn
        }
        else if ((hari >= 20 && bulan == 1) || hari <= 18 && bulan == 2) {
            return tipezodiak.aquarius
        }
        else if ((hari >= 19 && bulan == 2) || hari <= 20 && bulan == 3) {
            return tipezodiak.pisces
        }
    }


var data = {
    no: null,
    nama: req.body.nama,
    hari: reqHari,
    bulan: reqBulan,
    tahun: reqTahun,
    zodiak: myzodiak,
    usia: tahun - reqTahun

}
var sql = 'insert into karyawan SET ?';
db.query(sql, data, (error, result) => {

    if (error) throw error;
    console.log(result)
    res.send({
        status: 'Data sukses diinput!',
    })
});
})



app.get('/karyawan', (req, res) => {
    var sql = 'select * from karyawan';
    db.query(sql, (error, result) => {

        if (error) throw error;
        console.log(result)
        res.send(result)
        
    });
})

app.listen(3330, ()=>{
    console.log('Server aktif @port 3330')
});