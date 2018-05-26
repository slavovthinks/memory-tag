module.exports = (sequelize, DataTypes) => {
  const Memo = sequelize.define('Memo', {
    url: DataTypes.TEXT,
    user_email: DataTypes.STRING
  })
  // Memo.associate = models => {
  //   Memo.hasMany(models.Image, {as: 'Images'})
  // }

  Memo.associate = models => {
    Memo.belongsTo(models.Template)
    Memo.hasMany(models.Image)
  }
  return Memo
}
