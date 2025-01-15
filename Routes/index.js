const authRouter = require('./authRoute');
const userRouter = require('./userRoute')
const roomRouter = require('./roomRoute')

const mountRouters = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/Room', roomRouter);
}


module.exports = mountRouters;