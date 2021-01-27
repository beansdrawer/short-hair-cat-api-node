const { s3, paramsBreed } = require('./awsConfig')

const randomImageByBreed =  (breed) => new Promise((resolve, reject)=> {

  var certainBreed = `short-hair/${breed}/`
  
  var paramsCat = {
    Bucket: paramsBreed.Bucket,
    Delimiter: paramsBreed.Delimiter,
    Prefix: certainBreed,
    MaxKeys: paramsBreed.MaxKeys
  };

  s3.listObjects(paramsCat, function (error, result) {
    if(error){
      return reject({status: 'failed', message: 'invalid request or any problem occurred'})
    }

    var s3BreedObjects = result.Contents;
    if(s3BreedObjects.length < 1){
      return reject({status: 'failed', message: 'invalid request'})
    }

    var randIdxNum = Math.floor(Math.random()*s3BreedObjects.length)
    randIdxNum = randIdxNum == 0 ? randIdxNum + 1 : randIdxNum
    
    var s3Object = s3BreedObjects[randIdxNum];
    var s3File = 'https://image.beansdrawer.com/' + s3Object.Key;

    var responseObject = {status: 'success', message: s3File};
    //console.log(responseObject)
    return resolve(responseObject)
  })
})


module.exports = randomImageByBreed