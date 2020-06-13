const knex = require('knex')(require('../knexfile.js').development);
module.exports = {
    CreateUser: function CreateUser({ username, password }) {
        console.log(`Add user ${username} with password ${password}`);
        return knex('user').insert({
            username,
            password,
        });
    },
};
