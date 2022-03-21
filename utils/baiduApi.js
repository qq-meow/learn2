var AipOcrClient = require("baidu-aip-sdk").ocr; 
// 设置APPID/AK/SK 
/**植物识别 */
// var APP_ID = "16970676"; 
// var API_KEY = "qfRLYM4uy9lNylGhZ4ioriGS"; 
// var SECRET_KEY = "eMIjB0yQoKjXI2brOKjQaGZxknXvOYwK";
/**文字识别 */
var APP_ID = "16973103"; 
var API_KEY = "vjmMM1THsHd73e99FTAZXG91"; 
var SECRET_KEY = "EcSCCvKGQgY51XPD9eUsHOSRC6aRDdvA";

var ocr = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
module.exports = {
    ocr: ocr,
    appId: APP_ID,
    apiKey: API_KEY,
    secretKey:SECRET_KEY
}