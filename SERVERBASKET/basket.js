var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
var mongoFunctions = require('./mongoFunctions');
router.use(bodyParser.json());
var apiCalls = common_data.APICALLS;

router.post('/addItem', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.family, apiCalls.POST, 'items', {}, {}, req.body, {})
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getItems', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.family, apiCalls.GET, 'items', { 'date': 1 }, { 'toName': req.body.toName })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

router.post('/getAllItems', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.family, apiCalls.GET, 'items', { 'date': 1 })
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});


router.post('/checkItem', urlencodedParser, function (req, res) {
    var receivedData = mongoFunctions.handleData(req.body.family, apiCalls.UPDATESINGLE, 'items', {}, {},
        {
            "Check": req.body.Check
        },
        req.body._id)
        .then(function (result) {
            res.send({ Check: req.body.Check });
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router