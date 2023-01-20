'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
        url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674183486/spot_1_img_b0szpt.jpg',
        preview: true,
        spotId: 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674107412/spot2_fs0ena.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674184073/spot_4_unpuli.jpg',
      preview: false,
      spotId: 3
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674183957/spot_3_img_uk5stx.jpg',
      preview: false,
      spotId: 4
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
