const { SaltHashPassword } = require('../lib_modules/store.js');

exports.up = async function up(knex) {
    function convertPassword(user) {
        const { salt, hash } = SaltHashPassword(user.password);
        return knex('user').where({ id: user.id }).update({
            salt,
            encrypted_password: hash,
        });
    }

    // Create new columns
    await knex.schema.table('user', (t) => {
        t.string('salt').notNullable();
        t.string('encrypted_password').notNullable();
    });

    // Get user table
    const users = await knex('user');

    // Convert passwords to hashed
    await Promise.all(users.map(convertPassword));

    // Remove old column
    await knex.schema.table('user', (t) => {
        t.dropColumn('password');
    });
};
exports.down = async function down(knex) {
    await knex.schema.table('user', (t) => {
        t.dropColumn('salt');
        t.dropColumn('encrypted_password');
        t.string('password').notNullable();
    });
};
