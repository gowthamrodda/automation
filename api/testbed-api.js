'use strict';

const express = require('express');
const router = express.Router();
const TestBed = require('../models/testbed');

router.post('/testbeds', addTestBed);

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

    let init = {
        _id: '',
        body: req.body
    };
    let testbed = new TestBed(init);

    testbed
        .save()
        .then(() => {
            return res
                .status(200)
                .json({message: 'TestBed added succesfully'})
        })
        .catch((err) => {
            res.status(500).json({message: 'DB_ERROR_ON_SAVE', error: err});
        })

}
