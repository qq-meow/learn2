const model = require('../model.js');

const utils = require('../utils/utils.js')

const tokenTool = require('../utils/tokenTool.js')

let User = model.User;

const checkLogin = async (ctx, next) => {
    let token = ctx.header.token
    let secret = tokenTool.secret
    let tokenOpt = tokenTool.tokenOpt
    console.log (1111, 2222)
    let decToken = await tokenTool.checkLogin(token, secret, tokenOpt);
    console.log (decToken, 33333)
    let msg = ''
    let code = 0
    let data = decToken
    if (decToken.isLogin) {
        //
    } else {
        msg = '未登录'
    }
	utils.setData(data, ctx, code, msg)
}
module.exports = {
    'GET /checkLogin': checkLogin
}