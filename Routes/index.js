const authRouter = require('./authRoute');


const mountRouters = (app) => {
    app.use('/api/v1/auth', authRouter);
}


module.exports = mountRouters;