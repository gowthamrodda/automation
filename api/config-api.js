let request = require('request');

const express = require('express');
const router = express.Router();

router.get('/config', getConfig);

module.exports = router;


function getConfig(req, res) {
    console.log('IN Get config');
    let URL = 'http://10.202.10.46:3000/rpc/get-lacp-interface-information?interface-name=ae101';
    const headers = {
        Authorization: 'Basic cm9vdDpzaXRsYWIxMjMh',
        Accept: 'Application/json',
        ContentType: 'plain/text'
    };
    let options = {
        url: URL,
        headers: headers
    };

    request(options, (error, response, body) => {
        if (error) {
            return res
                .status(500)
                .json({error: error})
        }
        let info = JSON.parse(body);
        console.log(info);
    });

}




