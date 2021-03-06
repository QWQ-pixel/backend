const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  database: 'TODO_DB',
  username: 'postgres',
  password: '298471',
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Sequelize was initialized');
  } catch (error) {
    console.log(error);
    process.exit();
  }
};


module.exports = {
  sequelize,
  initDB
};
