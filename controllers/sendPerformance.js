const request = require('request-promise')
const utils = require('../utils/utils.js')
const smsClient = require('../utils/sendSms.js')
const fs = require('fs')
const superagent = require('superagent');
const cheerio = require('cheerio');
const tough = require('tough-cookie');


const sendPerformance =  async (ctx, next) => {
  console.log(ctx.request.body, '*****************')
  let data = {'msg':'这是一条axios返回的数据','b':2}
  utils.setData(data, ctx)
}



module.exports = {
	'GET /sendPerformance': sendPerformance
};