const Sequelize = require('sequelize');
const { sequelize } = require('..');

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING,
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'user' }
);
const ToDo = require('./ToDo.model');
const Token = require('./Token.model');

User.hasMany(ToDo);
ToDo.belongsTo(User);

User.hasMany(Token);
Token.belongsTo(User);

module.exports = User