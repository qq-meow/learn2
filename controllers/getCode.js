const request = require('request-promise')
const utils = require('../utils/utils.js')
const fs = require('fs')


const getToken = async (ctx, next) => {
    // console.log (ctx.request.body,'**********************************')
    var appid = ctx.request.body.appid || ''
    var secret = ctx.request.body.secret || ''
    var page = ctx.request.body.page || ''
    const AccessToken_options = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        qs: {
          appid: appid,
          secret: secret,
          grant_type: 'client_credential'
        },
        json: true
    }
    const resultValue = await request(AccessToken_options)
    const getCodeValue = await getCode(resultValue.access_token, page)
	// console.log (getCodeValue, '*************************s')
	let data = {
		src: getCodeValue
	}
	utils.setData(data, ctx)
};


const getCode = async (token, page) => {
  console.log(page, 2222)
    // console.log(token, '**********************************')
    let url = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + token
    let data = {
      scene: 'tag:6457',
      page: page,
      width: 280
    }
    const codeOptions = {
      method: 'POST',
      url: url,
      body: data,
      json: true,
      encoding: null
    }
    const resultValue = await request(codeOptions)

    fs.writeFile('./static/images/qscode.png', resultValue, 'utf8', function(err) {
        if(err) {console.log(err)}
    });
    return 'http://localhost:3000/images/qscode.png'
}

module.exports = {
	'POST /getToken': getToken
};