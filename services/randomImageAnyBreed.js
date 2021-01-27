const { s3, paramsBreed } = require('./awsConfig')

const randomImageAnyBreed =  () => new Promise((resolve, reject)=> {

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
    // certainBreed = 'short-hair/mackerel/'
    
    var paramsCat = {
      Bucket: 'image.beansdrawer.com',
      Delimiter: "/",
      Prefix: certainBreed,
      MaxKeys: 1000000
    };

    s3.listObjects(paramsCat, function (error, result) {
      if(error){
        console.error(error)
        return reject({status: 'failed', message: 'invalid request or any problem occurred'});
      }

      var s3BreedObjects = result.Contents;

      var randIdxNum = Math.floor(Math.random()*s3BreedObjects.length)
      randIdxNum = randIdxNum == 0 ? randIdxNum + 1 : randIdxNum

      var s3Object = s3BreedObjects[randIdxNum];
      var s3File = 'https://image.beansdrawer.com/' + s3Object.Key;

      var responseObject = {status: 'success', message: s3File};
      //console.log(responseObject)
      return resolve(responseObject)
    })
  })
})

module.exports = randomImageAnyBreed




