const authRouter = require('./authRoute');
const userRouter = require('./userRoute');
const roomRouter = require('./roomRoute');
const taskRouter = require('./taskRoute')

const mountRouters = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/Room', roomRouter);
    app.use('/api/v1/task', taskRouter);
}


module.exports = mountRouters;