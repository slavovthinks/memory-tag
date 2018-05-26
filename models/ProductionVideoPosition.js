module.exports = (sequelize, DataTypes) => {
  const ProductionVideoPostiton = sequelize.define('ProductionVideoPosition', {
    position: DataTypes.INTEGER
  })
  ProductionVideoPostiton.associate = models => {
    ProductionVideoPostiton.belongsTo(models.ProductionVideo)
  }
  return ProductionVideoPostiton
}
