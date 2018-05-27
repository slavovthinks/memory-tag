// uploadController
exports.index = function(req, res) {
    console.log(req.params.id);
    createMemo(req);
    res.render('upload.html')
};

// // Handle image upload on POST.
exports.imageCreatePost = function(req, res) {
    res.send('NOT IMPLEMENTED: IMAGE create POST');
};

function createMemo(req) {
    const { Memo } = require('../models');

    Memo.create({ id: req.params.id })
        .then(() => Memo.findOrCreate({where: {id: req.params.id} }))
.spread((memo, created) => {
        console.log(memo.get({
        plain: true
    }))
    });
}