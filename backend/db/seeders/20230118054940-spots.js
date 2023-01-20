'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options , [
      {
      ownerId: 1,
      address: '848 Jeffries Rd.',
      city: 'Big Bear Lake',
      state: 'California',
      country: 'United States of America',
      lat: 34.2382,
      lng: -116.9020,
      name: 'Edgewood Mansion',
      description: 'Amenities include a gym, sauna, wine cellar, private balcony for each bedroom, a fire pit, and more.',
      price: 500.00,
      avgRating: 4.5,
    },
    {
      ownerId: 2,
      address: '123 Elm Street',
      city: 'Broken Bow',
      state: 'Texas',
      country: 'United States of America',
      lat: 34.14606,
      lng: -94.70388,
      name: 'The High-Falutin\' Hideaway',
      description: 'Family Cabin with Breathtaking Views, Hot tub',
      price: 900.00,
      avgRating: 5,
    },
    {
      ownerId: 2,
      address: '1101 Parkview Vista Way',
      city: 'Pigeon Forge',
      state: 'Tennessee',
      country: 'United States of America',
      lat: 35.7884,
      lng: 83.5543,
      name: 'Mountain View Lodge',
      description: 'Each of the nine bedrooms has its own full bathroom, TV, and fireplace.',
      price: 1500.00,
      avgRating: 5,
    },
    {
      ownerId: 1,
      address: '1040 Highway 98 E',
      city: 'Destin',
      state: 'Florida ',
      country: 'United States of America',
      lat: 30.3935,
      lng: 86.4958,
      name: 'Navigators Nest',
      description: 'Mansion right on the water.',
      price: 1000.00,
      avgRating: 5,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
