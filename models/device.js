const ObjectId = require('mongodb').ObjectID;
const deviceDb = require('../access/deviceDb');

module.exports = Device;

function Device(init) {
    this._id = (init._id) ? new ObjectId(init._id) : null;
    this.testBed = String(init.testBed || '');
    this.domainName = String(init.domainName || '');
    this.metro = String(init.metro || '');
    this.localAs = String(init.localAs || '');
    this.role = String(init.role || '');
}

Device.prototype.save = save;
Device.prototype.getAll = getAll;
Device.prototype.getDeviceByTestBed = getDeviceByTestBed;
Device.prototype.updateById = updateById;
Device.prototype.deleteById = deleteById;

function save() {
    return new Promise((resolve, reject) => {
        new deviceDb()
            .save(this)
            .then(resolve)
            .catch(reject);
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        new deviceDb()
            .findAll()
            .then(resolve)
            .catch(reject);
    });
}

function getDeviceByTestBed(testbed) {
    return new Promise((resolve, reject) => {
        new deviceDb()
            .findByTestBed(testbed)
            .then(resolve)
            .catch(reject);
    });
}

function updateById(id) {
    return new Promise((resolve, reject) => {
        new deviceDb()
            .updateById(id, this)
            .then((data) => {
                return resolve(data);
            })
            .catch((err) => {
                return reject(err);
            });

    });
}

function deleteById(id) {
    return new Promise((resolve, reject) => {
        new deviceDb()
            .deleteById(id)
            .then((data) => {
                return resolve(data);
            })
            .catch((err) => {
                return reject(err);
            });
    });
}