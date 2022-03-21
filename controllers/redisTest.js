// const utils = require('../utils/utils.js')
// const redis = require('redis')
// const client = redis.createClient(6379,'localhost')
// const redisTest = async (ctx, next) => {
//     client.set('hello','{"a": 1, "b": 2}')
//     let redisRes = await getRedis()
// 	utils.setData(JSON.parse(redisRes), ctx)
// }

// const getRedis = () => {
//     return new Promise((resolve, reject) => {
//         client.get('hello',function (err, v) {
//             resolve(v)
//         })
//     })
// }

// module.exports = {
// 	'GET /redisTest': redisTest
// };