var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require("path");

var user;

router.get('/', function(req, res, next) { //Up and Running
    res.send('File Manager Active');
});


router.get('/pullData', function(req, res) { //Send Inventory Data to Client
    console.log("User Received " + req.query.user);

    user = req.query.user;
    if(user == undefined){
        user = "";
    }

    res.header("Content-Type",'application/json');
    return res.sendFile(path.resolve(__dirname, "../data/" + user + "inventory.json"));
});

router.get('/pullSalesData', function(req, res) {
    console.log("User Received " + req.query.user);

    user = req.query.user;
    if(user == undefined){
        user = "";
    }

    res.header("Content-Type",'application/json');
    return res.sendFile(path.resolve(__dirname, "../data/" + user + "sales.json"));
});

router.post('/sendData', function(req, res) {  //Send Sales Data to Client
    var dataReceived = req.body;
    console.log(dataReceived);
    fs.writeFile(path.resolve(__dirname, "../data/" + user + "inventory.json"), JSON.stringify(dataReceived), function (err) {
        if(err) throw err;
        console.log("Data Updated"); 
    })
});

router.post('/sendSalesData', function(req, res) {  //Get Sales Data from Client
    var dataReceived = req.body;

    fs.readFile(path.resolve(__dirname, "../data/" + user + "sales.json"), function (err, data) {
        if(err) throw err;

        var jsonArr = JSON.parse(data);
        jsonArr.push(dataReceived);

        fs.writeFile(path.resolve(__dirname, "../data/" + user + "sales.json"), JSON.stringify(jsonArr), function (err) {
            if(err) throw err;
            console.log("Data Updated"); 
        })
    })

});

router.get('/pullInvDataNames', function(req, res) { //Send Inventory Data to Client
    console.log("Pulling Inv Data Names");
    var names;
    var jsonArr;

    user = req.query.user;
    if(user == undefined){
        user = "";
    }
    fs.readFile(path.resolve(__dirname, "../data/" + user + "inventory.json"), function(err, data) {
        if(err) throw err;
        var jsonArr = JSON.parse(data);
        names = jsonArr.map(function(jsonArr) {return jsonArr.name;}); 
        return res.send(JSON.stringify(names));
    });
});

module.exports = router;