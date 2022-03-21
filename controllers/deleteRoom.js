const model = require('../model.js');

const utils = require('../utils/utils.js')

const tokenTool = require('../utils/tokenTool.js')

let roomList = model.Roomlist;

const deleteRoom = async (ctx, next) => {
    // console.log (model, '*******')
    // Object.keys(model).forEach((value) => {
        
    // })
    let roomId = ctx.request.body.roomId || ''
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
        //data = decToken
    } else {
        msg = '未登录'
        return
    }
    var roomlist = await roomList.destroy({
        where:{
            id: roomId
        }
    })
    console.log(roomlist, '****************')
    data.result = roomlist
	utils.setData(data, ctx, code, msg)
}
module.exports = {
    'POST /deleteRoom': deleteRoom
}