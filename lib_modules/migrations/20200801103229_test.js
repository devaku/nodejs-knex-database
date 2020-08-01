exports.up = async function up(knex) {
    // Create new columns
    await knex.schema.table('user', (t) => {
        t.string('TEST_COLUMN').notNullable();
    });
};

exports.down = async function down(knex) {
    await knex.schema.table('user', (t) => {
        t.dropColumn('TEST_COLUMN');
    });
};
