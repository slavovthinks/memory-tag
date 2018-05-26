const express = require('express')
const config = require('config')
const cors = require('cors')
const upload = require('jquery-file-upload-middleware');
const bodyParser = require('body-parser')
const app = express()
const nunjucks = require('nunjucks')

// const testRoute = require('./routes/test')
const uploadRoute = require('./routes/uploadRoute')
const homeRoute = require('./routes/homeRoute');
// var souvenirs = require('./routes/souvenirs');


nunjucks.configure('templates', {
  autoescape: true,
  express: app
})

// configure upload middleware
upload.configure({
    uploadDir: __dirname + '/public/uploads',
    uploadUrl: '/uploads',
    imageVersions: {
        thumbnail: {
            width: 80,
            height: 80
        }
    }
});

// app.configure(function () {

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

    // app.use('/upload_media', upload.fileHandler());
    // app.use(express.bodyParser());

// });

/// Redirect all to home except post
// app.get('/upload_media', function( req, res ){
//     res.redirect('/');
// });
//
// app.put('/upload_media', function( req, res ){
//     res.redirect('/');
// });
//
// app.delete('/upload_media', function( req, res ){
//     res.redirect('/');
// });

upload.on('begin', function (fileInfo, req, res) {
    console.log(fileInfo);
    // fileInfo structure is the same as returned to browser
    // {
    //     name: '3 (3).jpg',
    //     originalName: '3.jpg',
    //     size: 79262,
    //     type: 'image/jpeg',
    //     delete_type: 'DELETE',
    //     delete_url: 'http://yourhost/upload/3%20(3).jpg',
    //     url: 'http://yourhost/uploads/3%20(3).jpg',
    //     thumbnail_url: 'http://youhost/uploads/thumbnail/3%20(3).jpg'
    // }
});

app.use('/upload_media', function(req, res, next){
    console.log(req);
    console.log('helllloooow');
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/uploads/' + req.sessionId
        },
        uploadUrl: function () {
            return '/upload/' + req.sessionId
        }
    })(req, res, next);
});




// Enable CORS
app.use(cors())


// JS CSS AND ASSETS
app.use(express.static('static'))

app.use('/', homeRoute)
app.use('/upload', uploadRoute)
// app.use('/upload_media', uploadRoute)
app.listen(config.port, () => console.log(`listening on port ${config.port}`))
