const authRouter = require('./authRoute');
const userRouter = require('./userRoute');
const roomRouter = require('./roomRoute');
const taskRouter = require('./taskRoute');
const chatRouter = require('./chatRoute');

const mountRouters = (app) => {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/Room', roomRouter);
    app.use('/api/v1/task', taskRouter);
    app.use('/api/v1/chat', chatRouter);
}


module.exports = mountRouters;