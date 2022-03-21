const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const cors = require('koa2-cors');

const serve = require('koa-static');

const home = serve(__dirname + '/static/');

const request = require('request-promise')

const app = new Koa();

const fs = require('fs');

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({
    port: 3002
});
var process = require('child_process');
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
let imgAry = []
const screenFunc = async () => {
    let self = this
    let mydate = +new Date()
    let picName = mydate + '.jpeg'
    // await exec(`adb shell /system/bin/screencap -p  /sdcard/` + picName)
    await exec(`adb exec-out screencap -p > ./static/images/phone/` + picName)
    let datamy = {
        img: 'http://localhost:3000/images/phone/' + picName
    }
    await wss.ws.send(JSON.stringify(datamy))
    imgAry.push(picName)
    setTimeout(() => {
        fs.unlinkSync('./static/images/phone/' + imgAry[0])
    }, 100)
    // await exec(`adb shell rm /sdcard/` + picName)
}
const adbFen = async (msgObj) => {
    let type = msgObj.type
    let pagexy = msgObj.pagexy
    // console.log(type, '******789******')
    switch (type) {
        case 'open':
            await exec(`adb shell input keyevent 26`)
            break;
        case 'init':
            break;
        case 'click':
            var pagexCur = pagexy.pagexCur*1080/360 || ''
            var pageyCur = pagexy.pageyCur*1080/360 || ''
            console.log(pagexCur, pageyCur, '******')
            await exec(`adb shell input tap ` + pagexCur + ` ` + pageyCur)
            break;
        case 'swipe':
            var pagexPre = pagexy.pagexPre*1080/360 || ''
            var pageyPre = pagexy.pageyPre*1080/360 || ''
            var pagexCur = pagexy.pagexCur*1080/360 || ''
            var pageyCur = pagexy.pageyCur*1080/360 || ''
            console.log(pagexPre, pageyPre, '******')
            await exec(`adb shell input touchscreen swipe ` +pagexPre+ ` ` +pageyPre+ ` ` +pagexCur+ ` ` + pageyCur + `500`)
            break;
        default:
            break;
    }
    // await screenFunc ()
}
wss.on('connection', async (ws, event) => {
    setInterval(() => {
        screenFunc()
    }, 100);
    wss.ws = ws
    // setInterval(async () => {
    //     await screenFunc()
    // }, 100);
    ws.on('message',async function (message) {
        let msgObj = JSON.parse(message)
        adbFen(msgObj)
    })
    ws.on('close', function (closeMsg) {
        // console.log(closeMsg, '111********111')
        // self.personAry
    })
})


app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous', 'token'],
}));

// log request URL:
app.use(async (ctx, next) => {
    // console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(home)
app.use(bodyParser());
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');