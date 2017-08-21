const ObjectId = require('mongodb').ObjectID;
const TestBedDb = require('../access/testbedDb');

module.exports = TestBed;

function TestBed(init) {
    this._id = (init._id) ? new ObjectId(init._id) : null;
    this.name = String(init.name || '');
}

TestBed.prototype.save = save;
TestBed.prototype.getAll = getAll;
TestBed.prototype.findByName = findByName;

function save() {
    return new Promise((resolve, reject) => {
        new TestBedDb()
            .save(this)
            .then(resolve)
            .catch(reject);
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        new TestBedDb()
            .findAll()
            .then(resolve)
            .catch(reject);
    });
}

function findByName() {
    return new Promise((resolve, reject) => {
        new TestBedDb()
            .findByName(this.name)
            .then(resolve)
            .catch(reject);
    });
}