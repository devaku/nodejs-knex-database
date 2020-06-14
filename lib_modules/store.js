const crypto = require('crypto');
const knex = require('knex')(require('../knexfile.js').development);

function randomString() {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = {
    SaltHashPassword: function SaltHashPassword(password) {
        const salt = randomString();
        const hash = crypto.createHmac('sha512', salt).update(password);
        return {
            salt,
            hash: hash.digest('hex'),
        };
    },
    CreateUser: function CreateUser({ username, password }) {
        console.log(`Adding user ${username}`);
        const { salt, hash } = this.SaltHashPassword(password);
        return knex('user').insert({
            salt,
            encrypted_password: hash,
            username,
        });
    },
};
