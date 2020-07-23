// Update with your config settings.
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            // host: 'localhost',
            // user: 'root',
            // password: '',
            // database: 'nodejs_knex_database',

            // host: process.env.DB_HOST,
            // user: 'root',
            // password: process.env.DB_PASSWORD,
            // database: 'nodejs_knex_database',

            host: process.env.DB_HOST,
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,

            // host: process.env.DB_HOST,
            // user: process.env.DB_USERNAME,
            // password: process.env.DB_PASSWORD,
            // database: process.env.DB_NAME,
        },
        migrations: {
            directory: './lib_modules/migrations',
        },
        seeds: {
            directory: './lib_modules/seeds',
        },
    },

    staging: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
