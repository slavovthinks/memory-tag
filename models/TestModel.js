module.exports = (sequelize, DataTypes) => {
  const TestModel = sequelize.define('TestModel', {
    title: sequelize.STRING,
    description: sequelize.TEXT
  })

  return TestModel
}
