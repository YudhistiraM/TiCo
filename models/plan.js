'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    purpose: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    notes: DataTypes.STRING,
    status: DataTypes.STRING,
    parentplan: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  Plan.associate = function(models) {
    // associations can be defined here
  };
  return Plan;
};