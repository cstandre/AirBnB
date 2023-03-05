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
      spotId: 1,
      userId: 1,
      startDate: new Date("2023-08-08"),
      endDate: new Date("2023-08-15")
    },
    {
      spotId: 2,
      userId: 3,
      startDate: new Date("2023-11-01"),
      endDate: new Date("2023-11-30")
    },
    {
      spotId: 3,
      userId: 2,
      startDate: new Date("2023-05-03"),
      endDate: new Date("2023-06-16")
    },
    {
      spotId: 4,
      userId: 1,
      startDate: new Date("2023-10-20"),
      endDate: new Date("2023-11-04")
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options, null, {});
  }
};
