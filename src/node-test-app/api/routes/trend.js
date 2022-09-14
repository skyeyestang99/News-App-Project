const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const googleTrends = require('google-trends-api');


router.get('/', (req, res, next) => {
    console.log(req.query.q);
    const subject = req.query.q;
    googleTrends.interestOverTime({keyword: subject,
        startTime: new Date('2019-06-01')})
        .then(function(results){
            results = JSON.parse(results);
            console.log(results);
            res.status(200).json(results);
        })
        .catch(function(err){
            console.error(err);
        });
})

module.exports = router;
