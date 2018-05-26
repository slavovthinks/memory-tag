module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    path: DataTypes.TEXT,
    filename: DataTypes.STRING
  })


  return Image
}
