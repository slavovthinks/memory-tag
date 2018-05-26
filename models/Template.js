module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
    name: DataTypes.STRING,
    location: DataTypes.STRING
  })
  Template.associate = models => {
    Template.hasMany(models.ProductionVideoPosition)
  }
  return Template
}
