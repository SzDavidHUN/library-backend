const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // https://expressjs.com/en/resources/middleware/cors.html

const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventory');
const lentsRouter = require('./routes/lents');
const membersRouter = require('./routes/members');
const dbRouter = require('./routes/db');

let app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);
app.use('/lents', lentsRouter);
app.use('/members', membersRouter);
app.use('/db', dbRouter);

module.exports = app;
