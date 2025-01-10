const jwt = require('jsonwebtoken');

// const createToken =  jwt.sign({ userId: user._Id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRE_TIME
// });

const createToken = (payload) => 
    jwt.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
        expiresIn:process.env.JWT_EXPIRE_TIME,
    })
module.exports = createToken;
