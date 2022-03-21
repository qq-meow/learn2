const utils = require('../utils/utils.js')
const superagent = require('superagent');
const cheerio = require('cheerio');


var baseUrl = 'https://m.qsebao.com/zbb/serve/activities/luckyBag?share_code=17ca8ca4f6dff6fe&uuid=&platform=wechat&shareto=2&timestamp=2020072511400651877620918&from=singlemessage';



const getWeb =  async (ctx) => {
  let body = await superagent.get(baseUrl)
  var $ = cheerio.load(body.text);
  var root = $(".buy")
  console.log(body.res.text, "******************************************")
//   for (let index = 0; index < trList.length; index++) {
//     const element = trList.eq(index).find('.netsign');
//     const detailbtn = trList.eq(index).find('.caozuo-btn button').eq(1).attr('onclick')
//     // console.log (detailbtn.split("'")[1], '这是detailbtn***************')
//     listText.push(element.text())
//     if (element.text().indexOf('网络报名') > -1) {
//         isBao = true
//         let projectId = detailbtn.split("'")[1]
//         await superagent.get("http://czicmemyy.haoyisheng.com/phone/reservationOnline.do?projectId="+projectId).set("Cookie", Cookies)
//         sendSms()
//     }
//   }
    data = {}
    utils.setData(data, ctx)
}




module.exports = {
	'GET /getWeb': getWeb
};