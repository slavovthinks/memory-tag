const express = require('express')
const config = require('config')
const cors = require('cors')
const upload = require('jquery-file-upload-middleware');
const bodyParser = require('body-parser')
const app = express()
const nunjucks = require('nunjucks')
const shortID = require('shortid');

// Require controller modules.
const uploadController = require('./controllers/uploadController');
const { ProductionVideo } = require('./models')
const { Image } = require('./models')

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
            width: 120,
            height: 80
        }
    },
    quality: 100
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Redirect all to home except post
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

upload.on('begin', function (fileInfo) {
    var ext = fileInfo.name.substr(fileInfo.name.lastIndexOf('.') + 1);
    var shortid = shortID;
    fileInfo.name = shortid.generate() + '.' + ext;
});

upload.on('end', function (fileInfo, req, res) {
    var fullpath = __dirname + "/uploads/" + fileInfo.name;
    Image.create({
        MemoId: req.params.id,
        filename: fileInfo.name,
        path: fullpath
    })
        .then(() => Image.findOrCreate({where: {MemoId: req.params.id} }))
.spread((image, created) => {
        // console.log(image.get({
        // plain: true
        // }))
    })
});

app.post('/:id/upload_media', function(req, res, next){
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/uploads/'
        },
        uploadUrl: function () {
            return '/uploads'
        }
    })(req, res, next);
});

// Enable CORS
app.use(cors())

// JS CSS AND ASSETS

app.use(express.static('static'))

app.use('/', homeRoute)
// app.use('/upload', uploadRoute)

app.get('/:id', uploadController.index);

// app.use('/upload_media', uploadRoute)
app.listen(config.port, () => console.log(`listening on port ${config.port}`))
