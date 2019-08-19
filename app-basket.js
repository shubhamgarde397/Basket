//npm install cors
//npm install mongo
//npm install node
//npm install express

var exec = require('child_process').execFile;

var common_data = require('./SERVER/data.json');
var express = require(common_data.required.express);
var app = express();
app.use(express.static(__dirname));
var cors = require(common_data.required.cors)
app.use(cors());
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoFunctions = require('./SERVER/mongoFunctions');
var login = require('./SERVER/login');
var basket = require('./SERVER/basket');

app.use('/login', login);
app.use('/basket', basket);

app.get('/newMongo', function (req, res) {
    mongoFunctions.handleData("GARDE57", 0, "login")
        .then(function (result) {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
});

// app.listen(3002, function () {
//     console.log(common_data.Messages.serverStartMsg);
// });
app.listen(3002, '172.31.37.236', function () {
    console.log(common_data.Messages.serverStartMsg);
});

function replacer(a) { //making '' look like ""
    return a.replace(/'/g, '"')
}
