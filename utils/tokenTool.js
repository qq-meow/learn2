const jwt = require('jsonwebtoken')
const model = require('../model.js');
const secret = 'abcdefg'
const tokenOpt = { 
    expiresIn: 3600 
}
const User = model.User;

const verify = (...args) => {
    // console.log (args, '*******2222*******')
    return new Promise((resolve, reject) => {
        jwt.verify(...args, (error, decoded) => {
            error ? reject(error) : resolve(decoded);
        })
    })
}
const setToken = (options) => {
    return jwt.sign({
        name: options.name,
        _id: options._id
    }, secret, tokenOpt);
}
const checkLogin = async (token, secret, tokenOpt) => {
    let decToken
    try {
        decToken = await verify(token, secret, tokenOpt)
    } catch (error) {
        decToken = null
    }
    console.log (decToken, '*******1111*******')
    let data = {}
    if (decToken) {
        let user = await User.findOne({
            where:{
                name: decToken.name
            }
        })
        if (user) {
            data.isLogin = true
            data.name = decToken.name
            data.id = user.id
            data.isRegister = true
        } else {
            data.isLogin = false
            data.isRegister = false
            data.name = ''
        }
    } else {
        data.isLogin = false
        data.isRegister = true
    }
    return data
}
module.exports = {
    secret: secret,
    tokenOpt: tokenOpt,
    verify: verify,
    setToken: setToken,
    checkLogin: checkLogin
}