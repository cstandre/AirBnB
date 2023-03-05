'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {
      userId: 3,
      spotId: 1,
      review: 'Love the ambiance!',
      stars: 5,
    },
    {
      userId: 1,
      spotId: 2,
      review: 'Perfect stay for the whole family!',
      stars: 3,
    },
    {
      userId: 2,
      spotId: 3,
      review: 'Had trouble sleeping...',
      stars: 4,
    },
    {
      userId: 2,
      spotId: 4,
      review: 'Super authentic farm feel',
      stars: 4,
    }
  ], {});
  },

  down: async(queryInterface, Sequelize) => {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, null, {});
  }
};
