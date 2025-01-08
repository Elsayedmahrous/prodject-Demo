const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mountRouters = require('./Routes/index');

const app = express();
app.use(express.json())

// DB
dotenv.config({ path: 'config.env' });

mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
})


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`)
  }

// mountRouters
mountRouters(app);
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App running ${PORT}`);
})