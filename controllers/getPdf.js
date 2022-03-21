const request = require('request-promise')
const utils = require('../utils/utils.js')
const fs = require('fs')
const getPdf = async (ctx, next) => {
    const pdfOptions = {
        method: 'get',
        url: 'http://pubssit.1an.com/epolicy/getEpolicy/v3?i=YTY4RzhqNDIwMWZZbnUzMDI0U1pidjIwMjBUQlBSMDAwMDAwMDAyMDlITUh2eTMwWTMyNA%3D%3D.pdf&nonce=s7DyBOvI0dH2ajx5IuQIOA9lus8%3D',
        body: {
        },
        json: true,
        encoding: null
    }
    const pdfRes = await request(pdfOptions)
    await writePdf(pdfRes)
    let res = ctx.res
    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',//告诉浏览器这是一个二进制文件
        'Content-Disposition': 'attachment; filename=' + encodeURI('aaa.pdf'),//告诉浏览器这是一个需要下载的文件
    });//设置响应头
    // var readStream = fs.createReadStream('./static/images/aaa.pdf');//得到文件输入流
    res.write(pdfRes, 'binary')
    res.end()
	// let data = {
	// 	url: 'http://localhost:3000/images/aaa.pdf'
    // }
	// utils.setData(pdfRes, ctx)
};

const writePdf = (pdfRes) => {
    // console.log (pdfRes, 2222222)
    return new Promise((resolve, reject) => {
        fs.writeFile('./static/images/aaa.pdf', pdfRes, 'utf8', function(err) {
            resolve(err)
        });
    })
}

module.exports = {
	'GET /getPdf': getPdf
};