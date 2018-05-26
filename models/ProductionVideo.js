module.exports = (sequelize, DataTypes) => {
  const ProductionVideo = sequelize.define('ProductionVideo', {
    path: DataTypes.TEXT,
    api_id: DataTypes.STRING,
    location: DataTypes.STRING
  })

  return ProductionVideo
}
