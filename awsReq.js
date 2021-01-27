var AWS = require('aws-sdk');
AWS.config.loadFromPath(__dirname + "/config/awsconfig.json"); // 인증
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();
// var params = {Bucket:'image.beansdrawer.com', Key:'/short-hair/mackerel/n00-00.jpg'};
var paramsBreed = {
  Bucket: 'image.beansdrawer.com',
  Delimiter: "/",
  Prefix: "short-hair/",
  MaxKeys: 1000000
};


s3.listObjects(paramsBreed, function (error, result) {

  if(error){
    console.error(error)
    return;
  }

  //console.log(result)
  var catBreed = result.CommonPrefixes
  var s3ShortHair = catBreed[Math.floor(Math.random() * catBreed.length)]
  //var cleanShortHair = s3ShortHair.replace(/[^a-z\-]/g,'');
  //console.log(s3ShortHair)
  var certainBreed = s3ShortHair.Prefix

  // temporary using : will erase soon
  certainBreed = 'short-hair/mackerel/'
  
  var paramsCat = {
    Bucket: 'image.beansdrawer.com',
    Delimiter: "/",
    Prefix: certainBreed,
    MaxKeys: 1000000
  };
  s3.listObjects(paramsCat, function (error, result) {
    if(error){
      console.error(error)
      return;
    }

    var s3BreedObjects = result.Contents;
    var s3Object = s3BreedObjects[Math.floor(Math.random()*s3BreedObjects.length) + 1];
    var s3File = 'https://images.dog.ceo/breeds/' + s3Object.Key;

    var responseObject = {status: 'success', message: s3File};
    console.log(responseObject)

  })

})
// s3.getObject(params, function(error, result){
//   console.log(error,1)
//   console.log(result,2)
// })