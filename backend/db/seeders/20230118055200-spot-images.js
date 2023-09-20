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
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1677730584/Screen-Shot-2018-01-13-at-6.46.47-PM_ay0m7x.jpg',
      preview: true,
      spotId: 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678591498/oculus_img_3_dp9gmh.jpg',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678591495/oculus_img_2_xqyjcq.jpg',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678591503/oculus_img_4_zkzavs.webp',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678591507/oculus_img_5_usmtkf.webp',
      preview: false,
      spotId: 1
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678053625/HT_amityville_horror_house_01_as_160606_16x9_1600_bdvdmd.jpg',
      preview: true,
      spotId: 2
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678053697/nightmare_on_elm_street_sj40w3.jpg',
      preview: true,
      spotId: 3
    },
    {
      url: 'https://res.cloudinary.com/djclmc80y/image/upload/v1678053722/the_conjuring_rnpr3c.jpg',
      preview: true,
      spotId: 4
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};
