var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require("path");

var user;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('File Manager Active');
});

router.get('/new/:idP&:nameP&:quanP&:priceP&:descP&:tagsP', function(req, res) {
    var data = req.params;
    console.log(data.idP + data.nameP + data.priceP + data.descP + data.tagsP);
    res.send('File Manager Active');
});

router.get('/pullData', function(req, res) {
    console.log("User Received " + req.query.user);
    
    user = req.query.user;
    if(user == undefined){
        user = "";
    }
    
    res.header("Content-Type",'application/json');
    return res.sendFile(path.resolve(__dirname, "../data/" + user + "inventory.json"));
});

router.post('/sendData', function(req, res) {  
    var dataReceived = req.body;
    console.log(dataReceived);
    fs.writeFile(path.resolve(__dirname, "../data/" + user + "inventory.json"), JSON.stringify(dataReceived), function (err) {
        if(err) throw err;
        console.log("Data Updated"); 
    })
})

module.exports = router;