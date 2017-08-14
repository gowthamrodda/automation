'use strict';

const config = require('./config');
const mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectID;

module.exports = TestBedDb;

function TestBedDb() {
    this.collectionName = (((config.mongodb || {}).collections || {}).testbed || {}).name || 'testbed';
    this.options = (((config.mongodb || {}).collections || {}).device || {}).options || null;
}

TestBedDb.prototype.save = save;
TestBedDb.prototype.findAll = findAll;

//////////
function save(entity) {
    return new Promise((resolve, reject) => {
        entity._id = new ObjectId();
        mongo
            .db
            .collection(this.collectionName)
            .insertOne(entity, this.options)
            .then(() => {
                resolve(entity);
            })
            .catch(reject);
    });
}

//////////
function findAll() {
    return new Promise((resolve, reject) => {
        mongo
            .db
            .collection(this.collectionName)
            .find({})
            .toArray()
            .then((data) => {
                return resolve(data);
            })
            .catch(reject);
    });
}