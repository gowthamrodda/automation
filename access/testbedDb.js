'use strict';
const config = require('./config');
const mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectID;

module.exports = TestBedDb;

TestBedDb.prototype.save = save;
TestBedDb.prototype.findAll = findAll;
TestBedDb.prototype.findByName = findByName;
TestBedDb.prototype.deleteById = deleteById;


function TestBedDb() {
    this.collectionName = (((config.mongodb || {}).collections || {}).testbed || {}).name || 'testbed';
    this.options = (((config.mongodb || {}).collections || {}).device || {}).options || null;
}

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

function findByName(name) {
    return new Promise((resolve, reject) => {
        mongo
            .db
            .collection(this.collectionName)
            .find({"name": name})
            .toArray()
            .then((data) => {
                return resolve(data);
            })
            .catch(reject);
    });
}

function update(_id, entity) {
    return new Promise((resolve, reject) => {
        delete entity._id;
        mongo
            .db
            .collection(this.collectionName)
            .update(
                {"_id": ObjectId(_id)},
                {
                    "$set": entity
                }
            )
            .then((data) => {
                return resolve(data);
            })
            .catch((error) => {
                return reject(error);
            });
    });
}

function deleteById(_id) {
    return new Promise((resolve, reject) => {
        mongo
            .db
            .collection(this.collectionName)
            .removeOne(
                {"_id": ObjectId(_id)}
            )
            .then((data) => {
                return resolve(data);
            })
            .catch((err) => {
                return reject(err);
            });
    });
}




