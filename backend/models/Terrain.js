module.exports = (sequelize, DataTypes) => {
    const Terrain = sequelize.define('Terrain', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      movement_cost: DataTypes.INTEGER,
      defense_bonus: DataTypes.INTEGER,
      can_walk: DataTypes.BOOLEAN,
      spawn_weight: DataTypes.INTEGER,
      color: DataTypes.STRING,
    });
  
    Terrain.upsertTerrain = async function (terrainData) {
      await Terrain.upsert(terrainData);
    };
  
    return Terrain;
  };
  
  // Add new Swamp type Terrain
  await Terrain.upsertTerrain({
    name: 'Swamp',
    movement_cost: 3,
    defense_bonus: -1,
    can_walk: true,
    spawn_weight: 2,
    color: '#556B2F',
  });