module.exports = (sequelize, DataTypes) => {
  const VideoShow = sequelize.define('VideoShow', {
    api_id: DataTypes.STRING,
    url: DataTypes.TEXT,
    user_email: DataTypes.STRING
  })
  VideoShow.associate = models => {
    VideoShow.hasMany(models.Image)
  }

  VideoShow.associate = models => {
    VideoShow.belongsTo(models.Template)
  }
  return VideoShow
}
