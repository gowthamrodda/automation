let request = require('request');

const express = require('express');
const router = express.Router();

router.post('/config', getConfig);
router.post('/customString', getCustomString);

module.exports = router;


function getConfig(req, res) {
    console.log('In Get config');

    let customHost;
    let customPath;
    let customBody;
    if (req.body) {
        customHost = req.body.host;
        customPath = req.body.path;
        customBody = req.body.query;
    }
    console.log(req.body);
    //  let URL = 'http://10.202.10.46:3000/rpc/get-lacp-interface-information?interface-name=ae101';
    let URL = `${customHost}/${customPath}?${customBody}`;

    const headers = {
        Authorization: 'Basic cm9vdDpzaXRsYWIxMjMh',
        Accept: 'application/json',
        ContenType: 'application/xml'
    };
    let options = {
        url: URL,
        headers: headers
    };
    console.log('trace 1');
    request(options, (error, response, body) => {
        if (error) {
            return res
                .status(500)
                .json({error: error})
        }
        console.log(body);
        return res
            .status(response.statusCode)
            .send(body);
    });

}


function getCustomString(req, res) {
    console.log('In Get Custom string config');

    let customString;

    if (req.body) {
        customString = req.body.customString;
    }
    console.log(req.body);
    //  let URL = 'http://10.202.10.46:3000/rpc/get-lacp-interface-information?interface-name=ae101';
    let URL = 'http://www.equinix.xom'; // enter your url here

    const headers = {
        // Authorization: 'Basic cm9vdDpzaXRsYWIxMjMh',
        Accept: 'application/json',
        ContenType: 'application/xml'
    };
    let options = {
        url: URL,
        headers: headers,
        body: customString
    };

    console.log('trace 1');
    request(options, (error, response, body) => {
        if (error) {
            return res
                .status(500)
                .json({error: error})
        }
        console.log(body);
        return res
            .status(response.statusCode)
            .send(body);
    });

}
