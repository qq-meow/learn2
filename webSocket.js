const fs = require('fs');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

const wssInit = () => {
    const wss = new WebSocketServer({
        port: 3002
    });

    wss.personAry = []
    wss.broadcast = function (data) {
        // console.log(...wss.clients)
        wss.clients.forEach(function (client, index) {
            // console.log(client.protocol, '*****************')
            // console.log(wss[client.protocol], '*****************')
            let userId = client.protocol
            let user = wss.personAry.find((value) => {
                return value.author == userId
            })
            let userRommId = user.roomId
            console.log(userRommId, '*****************', data.data.roomId )
            if (data.data.roomId == userRommId) {
                client.send(JSON.stringify(data));
            }
        });
    };
    wss.on('connection', function (ws, event) {
        let self = this
        // console.log(`[SERVER] connection()`, event.url);
        let protocol = event.headers['sec-websocket-protocol'].split(',')
        let author = protocol[0].trim()
        let roomId =  protocol[1].trim()
        let index = self.personAry.findIndex((value) => {
            return value.author == author
        })
        if (index < 0) {
            self.personAry.push({
                author: author,
                roomId: roomId
            })
        } else {
            self.personAry[index].roomId = roomId
        }
        console.log(self.personAry, '***********')
        if (roomId == 'null') {
            let errMsg = {
                data: {},
                meta: {
                    code: 10000,
                    msg: '无效的房间号'
                }
            }
            ws.send(JSON.stringify(errMsg))
        }
        wss.ws = ws
        ws.on('message', function (message) {
            // console.log(`[SERVER] Received: ${message}`);
            // let msg = createMessage('chat', this.user, message.trim());
            if (roomId != 'null') {
                let msgObj = JSON.parse(message)
                let sucMsg = {
                    data:{
                        author: author,
                        msg: msgObj.msg,
                        roomId: roomId
                    },
                    meta: {
                        code: 0,
                        msg: ''
                    }
                }
                if (msgObj.roomId == roomId) {
                    wss.broadcast(sucMsg);
                }
            } else {
                let errMsg = {
                    data: {},
                    meta: {
                        code: 10000,
                        msg: '无效的房间号'
                    }
                }
                ws.send(JSON.stringify(errMsg))
            }
            // ws.send(message, (err) => {
            //     if (err) {
            //         console.log(`[SERVER] error: ${err}`);
            //     }
            // });
        })
        ws.on('close', function (closeMsg) {
            console.log(closeMsg, '111********111')
            // self.personAry
        })
    });
}
module.exports = function () {
    return wssInit
}