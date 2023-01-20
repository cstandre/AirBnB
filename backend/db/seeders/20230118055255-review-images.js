'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tbaleName = 'ReviewImages'
    await queryInterface.bulkInsert(options, [
      {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674107342/Edgewood_zat9co.jpg',
      reviewId: 1 // spotId 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674107481/spot3_eew2fo.jpg',
      reviewId: 2 // spotId 3
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674183808/spot_2_img_mz8moo.jpg',
      reviewId: 3 // spotId 2
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1674184224/spot_4_review_qilppk.jpg',
      reviewId: 3 // spotId 4
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tbaleName = 'ReviewImages'
    await queryInterface.bulkDelete(options, null, {});
  }
};
