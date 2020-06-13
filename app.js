//Load Development Variables
if (process.env.NODE_ENV === undefined) {
    require('dotenv').config();
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

//Set routes
routes(app);

//Set ejs as view engine
app.set('view engine', 'ejs');
app.set('view options', {
    delimiter: '?',
});

app.set('port', PORT);
app.listen(PORT, () => {
    log.LogConsole(`Server is running at URL http://localhost:${PORT}`);
});
