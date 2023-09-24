const express = require('express');
const path = require('path');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('gridfollowing', {
        testingVariable: 'Hello grid following!'
    });
});

module.exports = router;