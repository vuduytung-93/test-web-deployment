const express = require('express');
const paginate = require('express-paginate');
const path = require('path');
const fs = require('fs');

var data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../static/twitter/followings.json'))).data;
let tags = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../static/twitter/tags.json'))).tags;

var FollowingClasses = require('../public/javascripts/management/followings');
var Followings = FollowingClasses.Followings;
var followingData = new Followings(data);

var router = express.Router();

router.use(paginate.middleware(10, 50));

/* GET Management page */
router.get('/', (req, res, next) => {

    let currentPage = req.query.page === undefined ? 1 : parseInt(req.query.page);
    let followingPage = followingData.pages;

    if (followingPage[currentPage - 1] === undefined) res.status(404).send("Not found.");

    res.render('management', {
        nbPage: followingPage.length,
        page: followingPage[currentPage - 1],
        currentPage: currentPage,
        tags: tags
    });
});

router.put("/checkboxChecked", function (req, res) {
    console.log(req.body);

    // let screenName = req.body.screenName;
    // let tag = req.body.tag;
    // let pageId = req.body.pageIndex;
    // let taghentaiChecked = req.body.taghentai;
    // let tagnsfw3dChecked = req.body.tagnsfw3d;
    // let tagmodelChecked = req.body.tagmodel;
    // let tagcosplayChecked = req.body.tagcosplay;

    //console.log(screenName + ' : ' + tag + ' : ' + pageId);
    //followingData.setTagFolowing(pageId, screenName, tag, true);
    //res.render();
});

this.testCheckedBox = () => {
    console.log('checked');
};

module.exports = router;