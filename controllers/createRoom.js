const model = require('../model.js');

const utils = require('../utils/utils.js')

const tokenTool = require('../utils/tokenTool.js')

let roomList = model.Roomlist;

const createRoom = async (ctx, next) => {
    // console.log (model, '*******')
    // Object.keys(model).forEach((value) => {
        
    // })
    let roomName = ctx.request.body.roomName || ''
    let token = ctx.header.token
    let secret = tokenTool.secret
    let tokenOpt = tokenTool.tokenOpt
    console.log (1111, 2222)
    let decToken = await tokenTool.checkLogin(token, secret, tokenOpt);
    console.log (decToken, 33333)
    let msg = ''
    let code = 0
    let data = {}
    if (decToken.isLogin) {
        data = decToken
    } else {
        msg = '未登录'
        return
    }
    var roomlist = await roomList.create({
        roomName: roomName,
        name: roomName,
        ownerId: decToken.id
    })
    console.log(roomlist, '****************')
	utils.setData(data, ctx, code, msg)
}
module.exports = {
    'POST /createRoom': createRoom
}