const model = require('../model.js');

const utils = require('../utils/utils.js')

const tokenTool = require('../utils/tokenTool.js')

const crypto = require('crypto');

let User = model.User;

// const aesDecrypt = (encrypted, key) => {
//     const decipher = crypto.createDecipher('aes192', key);
//     var decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     return decrypted;
// }

const aesEncrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const login = async (ctx, next) => {
    // console.log(ctx.header.token, '***************')
    var name = ctx.request.body.name || ''
    var passwd = ctx.request.body.passwd || ''
    let key = 'psd-zq'
    // console.log(aesEncrypt(passwd, key), '*************')
    let user = await User.findOne({
        where:{
            name: name,
            passwd: aesEncrypt(passwd, key)
        }
    })
    // console.log(user, '*************')
    let msg = ''
    let code = 0
    let data = {}
    if (user) {
        const token = tokenTool.setToken({
            name: user.name,
            id: user.id
        });
        data = {
            token: token,
            expiresIn: tokenTool.tokenOpt.expiresIn
        }
        msg = '登录成功'
    } else {
        code = 1
        msg = '用户名或密码错误'
    }
	utils.setData(data, ctx, code, msg)
}
module.exports = {
    'POST /login': login
};