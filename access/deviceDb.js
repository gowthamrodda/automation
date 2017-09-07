'use strict';

const config = require('./config');
const mongo = require('./mongo');
const ObjectId = require('mongodb').ObjectID;

module.exports = DeviceDb;

function DeviceDb() {
    this.collectionName = (((config.mongodb || {}).collections || {}).device || {}).name || 'devices';
    this.options = (((config.mongodb || {}).collections || {}).device || {}).options || null;
}

DeviceDb.prototype.save = save;
DeviceDb.prototype.findAll = findAll;
DeviceDb.prototype.findByTestBed = findByTestBed;
DeviceDb.prototype.updateById = updateById;

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


//////////
function findByTestBed(testbed) {
    return new Promise((resolve, reject) => {
        mongo
            .db
            .collection(this.collectionName)
            .find({"testBed": testbed})
            .toArray()
            .then((data) => {
                return resolve(data);
            })
            .catch(reject);
    });
}

/////////
function updateById(_id, entity) {
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
