const cloudinary = require('cloudinary')
const videoshow = require('videoshow')
const config = require('config')

cloudinary.config(config.cloudinary)

// Converts image to mp4 video and calls callback with the output result
function convertImageToVideo (imagePath, saveTo, callback) {
  videoshow([imagePath], config.imageConvert).save(saveTo).on('end', (output) => {
    callback(output)
  })
}

// Uploads video from filePath and calls callback with cloud service video id
function uploadVideo (filePath, callback) {
  cloudinary.v2.uploader.upload(filePath, { resource_type: 'video' }, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      callback(result.public_id)
    }
  })
}

// merges videos from videoList in one video ordered as the list
function compileVideo (videoList) {
  let firstVideo
  let transformation = [
    {width: 300, height: 200, crop: 'scale', effect: 'fade:-500'}
  ]
  videoList.forEach((video, index) => {
    if (index === 0) {
      firstVideo = video
    } else {
      transformation.push({
        width: 300, height: 200, overlay: 'video:' + video, flags: 'splice', effect: 'fade:500'
      })
      transformation.push({
        effect: 'fade:-500'
      })
      transformation.push({
        flags: 'layer_apply'
      })
    }
  })

  return cloudinary.video(firstVideo, {
    autoplay: true,
    controls: true,
    transformation
  })
}

module.exports = {
  compileVideo,
  uploadVideo,
  convertImageToVideo
}
