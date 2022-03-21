const request = require('request-promise')
const getToken = async (ctx) => {
    var appid = ctx.request.body.appid || 'wxb0296077445ff4ec'
    var secret = ctx.request.body.secret || '6cfb00dbe2aabcc47c8b9dddc272bfb1'
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
    return await request(AccessToken_options)
}
module.exports = {
    getToken: getToken
}