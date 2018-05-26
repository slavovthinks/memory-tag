// uploadController
exports.index = function(req, res) {
    res.render('upload.html')
};

// // Handle image upload on POST.
exports.imageCreatePost = function(req, res) {
    res.send('NOT IMPLEMENTED: IMAGE create POST');
};