'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
      {
      userId: 3,
      spotId: 1,
      review: 'Best place ever!',
      stars: 5,
    },
    {
      userId: 1,
      spotId: 3,
      review: 'Was an "okay" experience.',
      stars: 3,
    },
    {
      userId: 2,
      spotId: 2,
      review: 'Has a blast!',
      stars: 4,
    },
    {
      userId: 2,
      spotId: 3,
      review: 'View was nice.',
      stars: 4,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, null, {});
  }
};
