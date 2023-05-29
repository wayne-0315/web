var express = require('express');
var router = express.Router();
var memberModel = require('../model/mem.js');
var articleModel = require('../model/article.js');

router.post('/lostupdate', function (req, res) {
    var newarticle = new articleModel ({
        // account: req.body.account,
        // name: req.body.name,
        // type: req.body.type,
        title: req.body.title,
        content: req.body.content,
        // like: [],
        // comment: [],
        postdate: []
    });
    newarticle.save(function (err, data){
        if (err) {
            res.json ({ "status": 1, "msg": "error"});
        }
        else {
            res.json ({ "status": 0, "msg": "success", "data": data});
        }
    });
}); 
module.exports = router;