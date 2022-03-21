// const koajwt = require('koa-jwt')

const setData = (data, ctx, code = 0, msg = '') => {
    let myData = {
        data: data,
        meta: {
            code: code,
            msg: msg
        }
    }
    ctx.body = myData
}

module.exports = {
    setData: setData
}