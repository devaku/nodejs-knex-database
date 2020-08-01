//Load Development Variables
if (process.env.NODE_ENV === undefined) {
    require('dotenv').config();
    console.log(require('dotenv').config());
}

const PORT = process.env.PORT;

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const app = express();

//morgan logger
app.use(morgan('short'));

//Public folder
app.use(express.static('public'));

//Parse incoming JSON
app.use(
    express.urlencoded({
        extended: true,
    })
);

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const knexConfig = require('./knexfile.js').development;

console.log(knexConfig);

const knex = require('knex')(knexConfig);
const store = new KnexSessionStore({
    knex,
    tablename: 'sessions', // optional. Defaults to 'sessions'
});

// Session system
app.use(
    session({
        secret: 'dragons',
        cookie: {
            maxAge: 10000, // ten seconds, for testing
        },
        store,
    })
);

//Set routes
routes(app);

//Set ejs as view engine
app.set('view engine', 'ejs');
app.set('view options', {
    delimiter: '?',
});

app.set('port', PORT);
app.listen(PORT, () => {
    console.log(`Server is running at URL http://localhost:${PORT}`);
});
