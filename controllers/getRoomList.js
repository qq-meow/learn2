const model = require('../model.js');

const utils = require('../utils/utils.js')

const baiduApi = require('../utils/baiduApi.js')

const tokenTool = require('../utils/tokenTool.js')

const fs = require('fs');

let roomList = model.Roomlist;

const getRoomList = async (ctx, next) => {
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
        //data = decToken
    } else {
        msg = '未登录'
        return
    }
    var roomlist = await roomList.findAll()
    let dataValues = []
    for (let i = 0; i < roomlist.length; i++) {
        dataValues.push(roomlist[i].dataValues)
    }
    console.log(dataValues, '****************')
    data.roomList = dataValues
    utils.setData(data, ctx, code, msg)
    

    let image = fs.readFileSync("./static/images/test.jpg").toString("base64");

    // 调用通用文字识别, 图片参数为本地图片
    baiduApi.ocr.generalBasic(image).then(function(result) {
        console.log(JSON.stringify(result));
    }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
    });
}
module.exports = {
    'GET /getRoomList': getRoomList
}