'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const terrains = [
      { 
        name: 'Grassland', 
        movement_cost: 1, 
        defense_bonus: 0, 
        can_walk: true, 
        spawn_weight: 4, 
        color: '#7CFC00',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Forest', 
        movement_cost: 2, 
        defense_bonus: 2, 
        can_walk: true, 
        spawn_weight: 3, 
        color: '#228B22',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Hill', 
        movement_cost: 3, 
        defense_bonus: 1, 
        can_walk: true, 
        spawn_weight: 2, 
        color: '#8B4513',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Water', 
        movement_cost: 999, 
        defense_bonus: -1, 
        can_walk: false, 
        spawn_weight: 1, 
        color: '#1E90FF',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        name: 'Mountain', 
        movement_cost: 999, 
        defense_bonus: 3, 
        can_walk: false, 
        spawn_weight: 1, 
        color: '#A9A9A9',
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ];

    // Bulk insert with upsert capability
    await queryInterface.bulkInsert('Terrains', terrains, {
      updateOnDuplicate: ['movement_cost', 'defense_bonus', 'can_walk', 'spawn_weight', 'color', 'updatedAt'],
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Terrains', null, {});
  }
};
