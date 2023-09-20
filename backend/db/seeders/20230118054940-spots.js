'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options , [
      { // Spot.id 1
      ownerId: 1,
      address: '17700 SE Forest Hill Dr',
      city: 'Damascus',
      state: 'Oregon',
      country: 'United States of America',
      lat: 45.39576437,
      lng: -122.437666785,
      name: 'Temple of Oculus Anubis',
      description: 'Located at the end of a quiet street, Oculus Anubis is not your average Oregon residence.',
      price: 600.00,
    },
    { // Spot.id 2
      ownerId: 2,
      address: '108 Ocean Ave',
      city: 'Amityville',
      state: 'New York',
      country: 'United States of America',
      lat: 40.6663933,
      lng: -73.415123,
      name: 'Amityville house',
      description: 'This five-bedroom house was built in Dutch Colonial style, and has a distinctive gambrel roof. It also has a swimming pool and a boathouse, as it is located on a canal',
      price: 900.00,
    },
    { // Spot.id 3
      ownerId: 2,
      address: '1428 Elm Street',
      city: 'Springwood',
      state: 'Ohio',
      country: 'United States of America',
      lat: 35.7884,
      lng: 83.5543,
      name: 'Nightmare on Elm Street',
      description: 'The house is quite the dream home, with 3 bedrooms and 4.5 bathrooms, along with a pool and a guest house.',
      price: 1500.00,
    },
    { // Spot.id 4
      ownerId: 1,
      address: '1677 Round Top Rd',
      city: 'Burrillville',
      state: 'Rhode Island',
      country: 'United States of America',
      lat: 42.0093,
      lng: 71.7092,
      name: 'The Conjuring House',
      description: 'Spacious 18th-century farmhouse',
      price: 1000.00,
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};
