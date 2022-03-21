const Core = require('@alicloud/pop-core')
const accessKeyId = 'LTAIuTIP2DiKoLU8'
const secretAccessKey = 'IlGWsG0mO7FdM3HACKr3PCTMjmztz1'
var client = new Core({
    accessKeyId: accessKeyId,
    accessKeySecret: secretAccessKey,
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
  });

module.exports = {
    client: client,
    SignName: '',
    TemplateCode: ''
}