const request = require('request-promise')
const utils = require('../utils/utils.js')
const smsClient = require('../utils/sendSms.js')
const fs = require('fs')
const superagent = require('superagent');
const cheerio = require('cheerio');
const tough = require('tough-cookie');


let formData = "userType=student&loginName=150407AMR&loginPwd=ABCabc123"
let loginurl = 'http://czicmemyy.haoyisheng.com/czicmeyy/phone/checkPassword.do'
var baseUrl = 'http://czicmemyy.haoyisheng.com/czicmeyy/phone/projectList.do';

var Cookies = ''; //伪装的cookie
//JSESSIONID=A719ACD1DF7F123EFE25D59BD26BC9F3
var cookiejar = request.jar();


const getBuffer = async (ctx, next) => {
	// console.log(utils, 2222)
	// let buff = fs.readFileSync('./static/txt/abc.txt','utf-8')
	// fs.writeFile('./static/images/abc.swf', buff, 'utf8', function(err) {
  //       if(err) {console.log(err)}
  //   });
	// let data = {
	// 	src: 'http://localhost:3000/images/abc.swf'
	// }
  // utils.setData(data, ctx)
  Cookies = ctx.request.body.cookie || ''
  // console.log (Cookies, 'Cookies0.0.0.0.0.0.0.0.0.0.0.')
  // if (Cookies) {
  //   await getList(ctx)
  // } else {
  //   await getcookie(ctx)
  // }
  await getcookie(ctx)
}

const getcookie = async (ctx) => {
  // let url = 'https://m2.qschou.com/index_v7_3.html'
  let cookieBody = await superagent.get(loginurl)
  Cookies = cookieBody.header['set-cookie'][0].split(';')[0]
  console.log(Cookies, '*****************')
  let newcookie = new tough.Cookie({
      key: "JSESSIONID",
      value: Cookies.split('=')[1],
      domain: 'czicmemyy.haoyisheng.com',
      httpOnly: true
  });
  cookiejar.setCookie(newcookie, 'http://czicmemyy.haoyisheng.com');
  const AccessToken_options = {
    method: 'POST',
    url: loginurl,
    form: formData,
    jar: cookiejar
  }
  await request(AccessToken_options)
  await getList(ctx)
}

const getList =  async (ctx) => {
  let body = await superagent.get(baseUrl).set("Cookie", Cookies)
  // console.log (body)
  var $ = cheerio.load(body.text);
  var trList = $("#projectInfoDiv").children(".pmp-list");
  var yearId = $("#yearId").val();
  console.log(yearId, "******************************************")
  let listurl = 'http://czicmemyy.haoyisheng.com/czicmeyy/phone/findAllProject.do'
  const listOptions = {
    method: 'POST',
    url: listurl,
    form: 'projectName=&specialtyId=&scoreType=&yearId=' +yearId+ '&startTime=&pageNo=2&pageSize=10',
    jar: cookiejar
  }
  let listResult = await request(listOptions)
  console.log(listResult)
  // console.log(body)
  // console.log(trList.eq(0).text())
  let isBao = false
  let listText = []
  // console.log (trList.length, 'trList.lengthtrList.lengthtrList.lengthtrList.lengthtrList.lengthtrList.length')
  if (trList.length < 1) {
    await getcookie(ctx)
    return
  }
  for (let index = 0; index < trList.length; index++) {
    const element = trList.eq(index).find('.netsign');
    const detailbtn = trList.eq(index).find('.caozuo-btn button').eq(1).attr('onclick')
    // console.log (detailbtn.split("'")[1], '这是detailbtn***************')
    listText.push(element.text())
    if (element.text().indexOf('网络报名') > -1) {
      isBao = true
      let projectId = detailbtn.split("'")[1]
      await superagent.get("http://czicmemyy.haoyisheng.com/phone/reservationOnline.do?projectId="+projectId).set("Cookie", Cookies)
      sendSms()
    }
  }
  let data = {
    isBao: isBao,
    list: listText,
    html: $(".pmp-box").html(),
    Cookies: Cookies
	}
  utils.setData(data, ctx)
  sendSms()
}

const sendSms = () => {
  // var params = {
  //   "RegionId": "default",
  //   "PhoneNumber": "18202285768",
  //   "SendDate": "2017",
  //   "PageSize": 1,
  //   "CurrentPage": 1
  // }
  
  // var requestOption = {
  //   method: 'POST'
  // };
  // smsClient.client.request('QuerySendDetails', params, requestOption).then((result) => {
  //   console.log(JSON.stringify(result));
  // }, (ex) => {
  //   console.log(ex);
  // })
}


// module.exports = {
// 	'POST /getBuffer': getBuffer
// };