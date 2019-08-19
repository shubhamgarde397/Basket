var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongodb = require(common_data.required.mongodb);
var mongoClient = mongodb.MongoClient;
const url = common_data.required.url;
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var apiCalls = common_data.APICALLS

router.post('/getLoginDetailsbyid', urlencodedParser, function (req, res) {
    var arr = { status: false };
    var status = false;
    mongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(common_data.Messages.error, err);
        }
        else {
            var tempDB = req.body.famID;
            var db = client.db(tempDB);
            var c = db.collection('login').find({ $and: [{ "username": req.body.username }, { "password": req.body.password }] }).count();
            c.then(function (result) {
                if (result == 0) {
                    return res.json({ status: false });
                }
                else {
                    mongoFunctions.handleData(tempDB, apiCalls.GET, 'members')
                        .then((result) => {
                            return res.json({ status: true, userData: result });
                        })
                }
                client.close();
            })
        }
    });
});

router.post('/register', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.loginData.familyId, apiCalls.POST, 'members', {}, {}, req.body.memberData)
        .then(function (result1) {
            mongoFunctions.handleData(req.body.loginData.familyId, apiCalls.POST, 'login', {}, {}, req.body.loginData)
                .then(function (result) {
                    res.send(result);
                })
                .catch((err) => {
                    res.send(err);
                });
        })
        .catch((err) => {
            console.log(err)
            res.send(err);
        });
});

router.post('/addnewuserdata', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(dbName, apiCalls.POST, collectionName, {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router