const crypto = require('crypto');
const knex = require('knex')(require('../knexfile.js').development);

function randomString() {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = {
    CreateUser: function CreateUser({ username, password }) {
        console.log(`Adding user ${username}`);
        const { salt, hash } = this.SaltHashPassword({ password });
        return knex('user').insert({
            salt,
            encrypted_password: hash,
            username,
        });
    },

    AuthenticateUser: async function AuthenticateUser({ username, password }) {
        console.log(`Authenticating user ${username}`);

        // Get the user row from the database
        let returnedRows = await knex('user').where({ username }).debug();
        let userRow = returnedRows[0];
        if (userRow) {
            if (!userRow) {
                console.log(`No row found`);
                return { success: false };
            } else {
                console.log(userRow.salt);
                // Use the salt from the database and hash the password given by the user
                const { hash } = this.SaltHashPassword({
                    password,
                    salt: userRow.salt,
                });

                console.log(hash);

                // If the hash returned is the same as the one in the database, then it's valid.
                return hash === userRow.encrypted_password;
            }
        }
    },

    SaltHashPassword: function SaltHashPassword({
        password,
        salt = randomString(),
    }) {
        console.log('Password: ', password);
        console.log('Generated Salt: ', salt);
        const hash = crypto.createHmac('sha512', salt).update(password);
        return {
            salt,
            hash: hash.digest('hex'),
        };
    },
};
