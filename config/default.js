module.exports = {
  db: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'memory_tag',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    operatorsAliases: false,
    logging: false,
    benchmark: false
  },
  port: 3000,
  cloudinary: {
    cloud_name: 'memory-tag',
    api_key: '591877321752327',
    api_secret: 'PPD7cx6lFb81wij41dPX3ZMph_0'
  },
  imageConvert: {
    fps: 3,
    loop: 5,
    transition: false,
    transitionDuration: 1,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p'
  }
}
