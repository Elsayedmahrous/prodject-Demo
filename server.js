const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mountRouters = require('./Routes/index');
const apiError = require('./utils/ApiError')

const app = express();
app.use(express.json())

// DB
dotenv.config({ path: 'confg.env' });

mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
})


if (process.env.NODE_DEV === 'Development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_DEV}`)
  }

// mountRouters
mountRouters(app);

app.all('*', (req, res, next) => {
    next(new apiError(`Can not find this route :${req.originalUrl}`, 400))
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App running ${PORT}`);
});

