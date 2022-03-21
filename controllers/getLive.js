const request = require('request-promise')
const utils = require('../utils/utils.js')
const getToken = require('../utils/getToken.js')
const fs = require('fs')
const getLive = async (ctx, next) => {
    // const resultValue = await getToken.getToken(ctx)
    const resultValue = '34_ePux3bK9Zf321fyVtX2sjDa60NddA4Jswc8_VfexLb15PQznBrDBi_weS-mYbI0ZqvugKmrUspyv61PcJYfqk37gliwjXXIMhAw4TvC4H_VdBYegOepOUr-aiukIjazCqbSqDmGIxQhxXartBIYgAIDGND'
    console.log (resultValue, '*************************s')
    var start = ctx.request.body.start || ''
    var limit = ctx.request.body.limit || ''
    const live_options = {
        method: 'POST',
        url: 'http://api.weixin.qq.com/wxa/business/getliveinfo?access_token=' + resultValue,
        body: {
            "start": start,
            "limit": limit
        },
        json: true,
        encoding: null
    }
    const liveList = await request(live_options)
	let data = {
		liveList: liveList
	}
	utils.setData(data, ctx)
};


module.exports = {
	'POST /getLive': getLive
};