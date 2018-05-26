module.exports = (sequelize, DataTypes) => {
  const TestModel = sequelize.define('TestModel', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT
  })

  return TestModel
}
