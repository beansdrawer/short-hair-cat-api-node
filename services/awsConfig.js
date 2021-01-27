var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname.replace("/services", "") + "/config/awsconfig.json"); // 인증
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();


var paramsBreed = {
  Bucket: 'image.beansdrawer.com',
  Delimiter: "/",
  Prefix: "short-hair/",
  MaxKeys: 1000000
};


module.exports = {
  s3, paramsBreed
}