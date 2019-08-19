/***
 * 0.GET
 * 1.POST
 * 2.DELETE_BY__ID
 * 3.UPDATE
 * 4.COUNT
 * 5.DELETE_DB
 * 6.LIMIT
 * 7.AGGREGATE
 * 8.DISTINCT
 * 9.INDEX
 * 10.UpdateSingleEntry
 */


var express = require('express')
var router = express.Router()
var common_data = require('./data.json');
var app = express();
var mongodb = require(common_data.required.mongodb);
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ encoded: false, extended: true })
const url = common_data.required.url;
// const dbName = common_data.database.dbname;
app.use(bodyParser.urlencoded({ extended: true }));


function getTableName(tablename) {
    var promise = new Promise((resolve, reject) => {
        tablename = tablename.replace(/ /g, "_");
        resolve(tablename);
    });
    return promise;
}

function createIndexCollection(body) {
    var promise = new Promise((resolve, reject) => {
        module.exports.handleData(body.newDB, 9, body.name)
            .then(function (result) {
                resolve('Done');
            })
            .catch((err) => {
                reject('NotDone');
            });
    });
    return promise;

}

module.exports = {
    handleData: function (dbName, apiCall, collectionName = '', sortData = {}, findData = {}, body = {}, manupulateData = {}, limit = null, justColumn = {}) {
        var promise = new Promise((resolve, reject) => {
            mongoClient.connect(url, function (err, client) {
                if (err) { console.log(common_data.Messages.error, err); }
                else {
                    getTableName(collectionName)
                        .then((tableName) => {
                            var db = client.db(dbName);
                            switch (apiCall) {
                                case 0:
                                    db.collection(tableName)
                                        .find(findData).sort(sortData).toArray(function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 1:
                                    if (body.family) {
                                        delete (body.family);
                                    } else if (body.familyId) {
                                        delete (body.familyId);
                                    }
                                    db.collection(tableName)
                                        .insertOne(body, function (err, result) {
                                            if (err) {
                                                reject({ done: 1 });

                                            }
                                            else {
                                                resolve({ done: 0 });
                                            }
                                            client.close();
                                        });
                                    break;
                                case 2:
                                    db.collection(tableName)
                                        .deleteOne({ _id: new mongodb.ObjectID(manupulateData) }, function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 3:
                                    db.collection(tableName)
                                        .update({ _id: new mongodb.ObjectID(manupulateData) },
                                            body,
                                            function (err, result) {
                                                if (err) {
                                                    reject(err);
                                                }
                                                else {
                                                    resolve("Data updated Successfully!");
                                                }
                                            });

                                    client.close();
                                    break;
                                case 4:
                                    db.collection(tableName).find(findData)
                                        .count(function (err, result) {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                resolve((JSON.stringify(result)));
                                            }
                                        });
                                    client.close();
                                    break;
                                case 5:
                                    db.collection(tableName).drop(function (err, result) {
                                        if (err) throw err;
                                        if (result) resolve("Collection deleted");
                                        client.close();
                                    });
                                    break;
                                case 6:
                                    db.collection(tableName)
                                        .find(findData, justColumn).sort(sortData).limit(limit).toArray(function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 7:
                                    // [{ $project: { 'truckno': 1 } }]
                                    db.collection(tableName)
                                        .aggregate(manupulateData).toArray(function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 8:
                                    db.collection(tableName)
                                        .distinct(limit, function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;

                                case 9:
                                    db.collection(tableName)
                                        .createIndex({ 'lrno': 1 }, { unique: true }, function (err, result) {
                                            if (err) {
                                                reject(err);
                                            }
                                            else {
                                                resolve(result);
                                            }
                                            client.close();
                                        });
                                    break;
                                case 10:
                                    db.collection(tableName)
                                        .update({ _id: new mongodb.ObjectID(manupulateData) },
                                            { $set: body },
                                            function (err, result) {
                                                if (err) {
                                                    reject(err);
                                                }
                                                else {
                                                    resolve("Data updated Successfully!");
                                                }
                                            });

                                    client.close();
                                    break;
                            }
                        });
                }
            });
        });
        return promise;
    }
}
