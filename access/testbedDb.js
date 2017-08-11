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