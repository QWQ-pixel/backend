const Sequelize = require('sequelize');
const { sequelize } = require('..');

class Token extends Sequelize.Model {}

Token.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 
        },
        user_id: {
            type: Sequelize.DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        value: {
            type: Sequelize.STRING(192)
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'token' }
);

module.exports = Token