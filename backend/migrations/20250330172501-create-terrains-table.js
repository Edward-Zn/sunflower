'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Terrains', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      movement_cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      defense_bonus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      can_walk: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      spawn_weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#FFFFFF',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Terrains');
  }
};
