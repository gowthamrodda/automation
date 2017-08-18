'use strict';

const express = require('express');
const router = express.Router();
const Device = require('../models/device');

router.post('/devices', addDevices);
router.get('/devices', getDevices);

module.exports = router;


function addDevices(req, res) {

    if (Object.keys(req.body).length === 0) {
        console.log(`INVALID_BODY: ${JSON.parse(req.body)}`);

        return res
            .status(422)
            .json({
                message: 'INVALID_BODY'
            });
    }

    delete req.body._id; // make sure the client isn't injecting it's own id

    let device = new Device(req.body);

    device
        .save()
        .then(() => {
            return res
                .status(200)
                .json({message: 'Device added succesfully'})
        })
        .catch((err) => {
            res.status(500).json({message: 'DB_ERROR_ON_SAVE', error: err});
        })

}

function getDevices(req, res) {
    let queryParams = req.query;

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    if (req.query.testBed) {
        let testBed = req.query.testBed;

        let init = {};
        let device = new Device(init);
        device
            .getDeviceByTestBed(testBed)
            .then((deviceInfo) => {
                console.log(deviceInfo, 'deviceInfo By TestBed');
                return res
                    .status(200)
                    .json({deviceInfo: deviceInfo});
            })
            .catch((err) => console.log(err, 'Error at device testbed'));
    }


    // if (req.query.labId) {
    //     let labId = req.query.labId;
    //     return res
    //         .status(200)
    //         .json({message: 'got your labid', labId: labId});
    // }
    // if (req.query.rackId) {
    //     let rackId = parseInt(req.query.rackId);
    //
    //     let init = {};
    //     let device = new Device(init);
    //     device
    //         .getByRackId(rackId)
    //         .then((deviceInfo) => {
    //             console.log(deviceInfo, 'deviceInfo');
    //             return res
    //                 .status(200)
    //                 .json({deviceInfo: deviceInfo})
    //         })
    //         .catch((error) => {
    //             return res
    //                 .status(400)
    //                 .json({error: error});
    //         });
    // }
    // if (req.query.cageId) {
    //     let cageId = req.query.cageId;
    //     return res
    //         .status(200)
    //         .json({message: 'got your CageId', cageId: cageId});
    // }

    console.log(queryParams);
    if (isEmpty(queryParams)) {

        let init = {};
        let device = new Device(init);
        device
            .getAll()
            .then((response) => {
                console.log(response, 'response');
                return res
                    .status(200)
                    .json({devices: response})

            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({error: err, message: 'Error at getDevices'});
            })
    }
}

