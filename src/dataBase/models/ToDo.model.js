const Sequelize = require('sequelize');
const { sequelize } = require('..');

class ToDo extends Sequelize.Model {}

ToDo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: 'Title',
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        isFavorite: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        priority: {
            type: Sequelize.INTEGER,
        }
    },
    { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = ToDo