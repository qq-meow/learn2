const model = require('../model.js');

const utils = require('../utils/utils.js')

const request = require('request-promise')

const baiduApi = require('../utils/baiduApi.js')

const tokenTool = require('../utils/tokenTool.js')

var urlencode = require('urlencode');

const fs = require('fs');

const getWord = async (ctx, next) => {
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
    
    let tokenurl = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + baiduApi.apiKey + '&client_secret=' + baiduApi.secretKey
    const AccessToken_options = {
        method: 'GET',
        url: tokenurl,
        json: true
    }
    const resultValue = await request(AccessToken_options)
    const accessToen = resultValue.access_token
    console.log(accessToen, 666666);
    let image = fs.readFileSync("./static/images/jstest.jpg").toString("base64");
    // 调用通用文字识别, 图片参数为本地图片
    let formData = {
        'image': image,
        'language_type': 'CHN_ENG'
    }
    const wordOptions = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=' + accessToen,
        method: 'POST',
        form: formData
    }
    let shibieResult = await request(wordOptions)
    let resultObj = JSON.parse(shibieResult)
    console.log(resultObj.words_result, '********2222********')
    let runStr = ''
    for (let i = 0; i < resultObj.words_result.length; i++) {
        let words = resultObj.words_result[i].words
        console.log(words, '*****6666*****')
        if (words.indexOf('script') < 0) {
            let wordsNew  = ''
            if (words.indexOf('console') > -1) {
                wordsNew = words.replace(/console(.+?)log/g, 'return ').replace(/[\(\)]/g, '') + ';'
            } else {
                wordsNew = words
            }
            console.log(wordsNew, '*****6666*****')
            runStr += wordsNew[wordsNew.length -1] == ';' ? wordsNew : wordsNew + ';'
        }
    }
    let runStrPre = 'function test(){';
    let runStrNex = '}'
    let runStrNew = runStrPre+runStr+runStrNex
    console.log(runStrNew, '*****3333*****')
    fs.writeFile('./static/js/test.js', runStrNew, 'utf8', function(err) {
        if(err) {console.log(err)}
    });
    data.result = {jsurl: 'http://localhost:3000/js/test.js'}
    utils.setData(data, ctx, code, msg)

    // let formData ={
    //     'image': image,
    //     baike_num: 5
    // }
    // const shibieoptions = {
    //     headers: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     method: 'POST',
    //     url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token=' + accessToen,
    //     form: formData
    // }
    // let shibieResult = await request(shibieoptions)
    // data.result = shibieResult
    // utils.setData(data, ctx, code, msg)
    
    
    
    
    // baiduApi.ocr.generalBasic(image).then(function(result) {
    //     console.log(result, 5555);
    //     data.word = JSON.stringify(result)
    //     utils.setData(data, ctx, code, msg)
    // }).catch(function(err) {
    //     // 如果发生网络错误
    //     console.log(err, 666666);
    // });
}

module.exports = {
    'GET /getWord': getWord
}