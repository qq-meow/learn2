const model = require('../model.js');
const utils = require('../utils/utils.js')
const tokenTool = require('../utils/tokenTool.js')
const crypto = require('crypto');

// const hash = crypto.createHash('md5');


let User = model.User;

const aesEncrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}


const register = async (ctx, next) => {
    let key = 'psd-zq'
    var name = ctx.request.body.name || ''
    var passwd = ctx.request.body.passwd || ''
    var email = ctx.request.body.email || ''
    // console.log (aesEncrypt(passwd, key), '****************')
    let haveuser = await User.findOne({
        where:{
            name: name
        }
    })
    if (haveuser) {
        let data = {}
        let code = 1
        msg = '用户名已存在'
        utils.setData(data, ctx, code, msg)
    } else {
        var user = await User.create({
            name: name,
            gender: 0,
            email: email,
            passwd: aesEncrypt(passwd, key)
        });
        let data = {}
        let code = 0
        if (user) {
            const token = tokenTool.setToken({
                name: user.name,
                id: user.id
            });
            data = {
                token: token,
                expiresIn: tokenTool.tokenOpt.expiresIn
            }
            msg = '注册并登录成功'
            utils.setData(data, ctx, code, msg)
        }
    }
}
module.exports = {
    'POST /register': register
};