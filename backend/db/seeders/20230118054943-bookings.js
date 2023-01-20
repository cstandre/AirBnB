'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkInsert(options, [
      {
      spotId: 2,
      userId: 1,
      startDate: "2023-08-08",
      endDate: "2023-08-15"
    },
    {
      spotId: 3,
      userId: 3,
      startDate: "2023-11-01",
      endDate: "2023-11-30"
    },
    {
      spotId: 2,
      userId: 2,
      startDate: "2023-05-03",
      endDate: "2023-06-16"
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, null, {});
  }
};
