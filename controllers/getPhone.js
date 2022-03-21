const utils = require('../utils/utils.js')

const request = require('request-promise')

const fs = require('fs');

var process = require('child_process');


const getPhone = async (ctx, next) => {
    let mydate = +new Date()
    let picName = mydate + '.png'
    await exec(`adb shell  /system/bin/screencap -p  /sdcard/` + picName)
    await exec(`adb pull /sdcard/` + picName + `  ./static/images/phone`)
    let msg = ''
    let code = 0
    let data = {}
    data.img = {
        src: 'http://localhost:3000/images/phone/' + picName
    }
    utils.setData(data, ctx, code, msg)
    console.log(mydate)
    setTimeout(() => {
        fs.unlinkSync('./static/images/phone/' + picName)
    }, 100);
}
const exec = (shell) => {
    return new Promise((resolve, reject) => {
        process.exec(shell,function (error, stdout, stderr) {
            // console.log (error, '***********1111**********')
            // console.log (stdout, '***********2222**********')
            // console.log (stderr, '***********3333**********')
            if (error !== null) {
                console.log('exec error: ' + error);
            } else {
                resolve(stdout)
            }
        });
    })
}

const touchMoveFunc = async (ctx, next) => {
    var pagexPre = ctx.request.body.pagexPre*1080/360 || ''
    var pageyPre = ctx.request.body.pageyPre*1080/360 || ''
    var pagexCur = ctx.request.body.pagexCur*1080/360 || ''
    var pageyCur = ctx.request.body.pageyCur*1080/360 || ''
    console.log(pagexPre, pageyPre, '******')
    await exec(`adb shell input touchscreen swipe ` +pagexPre+ ` ` +pageyPre+ ` ` +pagexCur+ ` ` +pageyCur)
    // let mydate = +new Date()
    // let picName = mydate + '.png'
    // await exec(`adb shell  /system/bin/screencap -p  /sdcard/` + picName)
    // await exec(`adb pull /sdcard/` + picName + `  ./static/images/phone`)
    // let msg = ''
    // let code = 0
    // let data = {}
    // data.img = {
    //     src: 'http://localhost:3000/images/phone/' + picName
    // }
    // utils.setData(data, ctx, code, msg)
}
const touchEndFunc = async (ctx, next) => {
    //1080*1920
    var pagexCur = ctx.request.body.pagexCur*1080/360 || ''
    var pageyCur = ctx.request.body.pageyCur*1080/360 || ''
    console.log(pagexCur, pageyCur, '******')
    await exec(`adb shell input tap ` + pagexCur + ` ` + pageyCur)
    // let mydate = +new Date()
    // let picName = mydate + '.png'
    // await exec(`adb shell  /system/bin/screencap -p  /sdcard/` + picName)
    // await exec(`adb pull /sdcard/` + picName + `  ./static/images/phone`)
    // let msg = ''
    // let code = 0
    // let data = {}
    // data.img = {
    //     src: 'http://localhost:3000/images/phone/' + picName
    // }
    // utils.setData(data, ctx, code, msg)
}
module.exports = {
    'GET /getPhone': getPhone,
    'POST /touchMoveFunc': touchMoveFunc,
    'POST /touchEndFunc': touchEndFunc
}