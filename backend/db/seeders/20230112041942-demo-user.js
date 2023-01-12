'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'caitlynstandre@gmail.com',
        username: 'CaitlynStAndre',
        hashedPassword: bcrypt.hashSync('coolBeans')
      },
      {
        email: 'binxthesphynx@instagram.com',
        username: '_binx.the.sphynx_',
        hashedPassword: bcrypt.hashSync('catnip')
      },
      {
        email: 'salem@noinsta.com',
        username: 'salem_no_insta',
        hashedPassword: bcrypt.hashSync('MiceHunter')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['CaitlynStAndre', '_binx.the.sphynx_', 'salem_no_insta'] }
    }, {});
  }
};
