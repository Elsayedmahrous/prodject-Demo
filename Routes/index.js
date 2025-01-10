const authRouter = require('./authRoute');
const userRouter = require('./userRoute')

const mountRouters = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/user', userRouter);
}


module.exports = mountRouters;