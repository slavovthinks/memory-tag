module.exports = {
  db: {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: '',
    password: '',
    database: '',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    operatorsAliases: false,
    logging: false,
    benchmark: false
  },
  port: 3000
}
