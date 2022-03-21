// http://api.weixin.qq.com/wxa/business/getliveinfo?access_token=
const request = require('request-promise')
const utils = require('../utils/utils.js')
const getToken = require('../utils/getToken.js')
const fs = require('fs')
const getVideo = async (ctx, next) => {
    var action = ctx.request.body.action || ''
    var room_id = ctx.request.body.room_id || ''
    var start = ctx.request.body.start || ''
    var limit = ctx.request.body.limit || ''
    const resultValue = await getToken.getToken(ctx)
    const video_options = {
        method: 'POST',
        url: 'http://api.weixin.qq.com/wxa/business/getliveinfo?access_token=' + resultValue.access_token,
        body: {
            "action": action,
            "room_id": room_id,
            "start": start,
            "limit": limit
        },
        json: true,
        encoding: null
    }
    const video = await request(video_options)
	// console.log (getCodeValue, '*************************s')
	let data = {
		video: video
	}
	utils.setData(data, ctx)
};


module.exports = {
	'POST /getVideo': getVideo
};
