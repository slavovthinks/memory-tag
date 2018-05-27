const path = require('path')
const studio = require('./../lib/studio')
const { Image, Memo, Sequelize } = require('./../models')
const Op = Sequelize.Op

exports.createVideo = (req, res) => {
  const userImagePositions = JSON.parse(req.body).orderedPhotos
  const template = ['asdad', '', 'bbsa', '', '', 'asdd', 'asdda', '']

  Promise.all(userImagePositions.map((photo) => {
    return Image.findOne({
      where: {
        filename: photo.filename
      }
    }).then(image => image.update({ position: photo.position }))
  })).then(images => {
    let positionServiceId = {}
    for (let image of images) {
      studio.convertImageToVideo(image.filepath, path.join(__dirname, '../temp/', image.filename + '.mp4'), (videoPath) => {
        studio.uploadVideo(videoPath, (serviceId) => {
          positionServiceId[image.position] = serviceId
        })
      })
    }
    let orderedImageIds = []
    for (let position in positionServiceId) {
      if (positionServiceId.hasOwnProperty(position)) {
        orderedImageIds[parseInt(position)] = positionServiceId[position]
      }
    }
    let orderedVideo = []
    for (let videoId of template) {
      if (videoId == '') {
        orderedVideo.push(orderedImageIds.pop())
      } else {
        orderedVideo.push(videoId)
      }
    }

    let videoTag = studio.compileVideo(orderedVideo)

    Memo.findById(req.params.id).then(memo => {
      memo.update({
        video_tag: videoTag
      })
      res.send(videoTag)
    })
  })
}
