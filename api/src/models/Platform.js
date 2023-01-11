const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Platform', {
      
    name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        timestamps: false
    });
}