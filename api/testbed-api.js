'use strict';

const express = require('express');
const router = express.Router();
const TestBed = require('../models/testbed');

router.post('/testbeds', addTestBed);
router.get('/testbeds', getTestBeds);

module.exports = router;


function addTestBed(req, res) {

    if (Object.keys(req.body).length === 0) {
        console.log(`INVALID_BODY: ${JSON.parse(req.body)}`);

        return res
            .status(422)
            .json({
                message: 'INVALID_BODY'
            });
    }

    delete req.body._id; // make sure the client isn't injecting it's own id

    let testbed = new TestBed(req.body);
    // let testBedId;

    if (req.body.name) {
        testbed
            .findByName()
            .then((testBed) => {

                if (testBed.length === 0) {
                    testbed
                        .save()
                        .then(() => {
                            return res
                                .status(200)
                                .json({message: 'TestBed added succesfully', status: true})
                        })
                        .catch((err) => {
                            res.status(500).json({message: 'DB_ERROR_ON_SAVE', error: err});
                        });

                } else {
                    return res
                        .status(200)
                        .json({message: testBed[0].name + ' TestBed already exists', status: false});
                }
            })
            .catch((err) => {
                console.log('TestBed not found @addTestBed');
            });
    }


}

function getTestBeds(req, res) {
    let queryParams = req.query;

    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
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
        let testbed = new TestBed(init);
        testbed
            .getAll()
            .then((response) => {
                return res
                    .status(200)
                    .json({testbeds: response})

            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({error: err, message: 'Error at getTestBeds'});
            })
    }
}

