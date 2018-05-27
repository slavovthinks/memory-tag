module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    path: DataTypes.TEXT,
    filename: DataTypes.STRING,
    position: DataTypes.INTEGER
  })

  return Image
}
