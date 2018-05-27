// uploadController
const { Memo } = require('../models');
exports.index = function(req, res) {
    res.render('upload.html')
};

// // Handle image upload on POST.
exports.imageCreatePost = function(req, res) {
    res.send('NOT IMPLEMENTED: IMAGE create POST');
};

exports.memoCheckVideo = function(req, res) {
    Memo.findById(req.body.id)
        .then(memo => {
        if(memo.video_tag) {
            console.log('VLIZA1');
            res.json({"status": "true", "video_tag": "MYVIDEOTAG"});
        } else {
            res.json({"status": "false", "video_tag": ""});
        }
    }).catch(() => {
        res.json(404, { "message": "Not found"});
            console.log('GRUM');
    });
};



