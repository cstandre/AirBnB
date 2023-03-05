'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@gmail.com',
        username: 'DemoUser',
        firstName: 'Demo',
        lastName: 'User',
        hashedPassword: bcrypt.hashSync('Password123')
      },
      {
        email: 'caitlynstandre@gmail.com',
        username: 'CaitlynStAndre',
        firstName: 'Caitlyn',
        lastName: 'St.Andre',
        hashedPassword: bcrypt.hashSync('coolBeans')
      },
      {
        email: 'binxthesphynx@instagram.com',
        username: '_binx.the.sphynx_',
        firstName: 'Binx',
        lastName: 'St.Andre',
        hashedPassword: bcrypt.hashSync('catnip')
      },
      {
        email: 'salem@noinsta.com',
        username: 'salem_no_insta',
        firstName: 'Salem',
        lastName: 'St.Andre',
        hashedPassword: bcrypt.hashSync('MiceHunter')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, null, {});
  }
};
