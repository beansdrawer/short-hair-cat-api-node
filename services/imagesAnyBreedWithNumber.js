const { s3, paramsBreed } = require('./awsConfig')

function callback(error, result, resolve, reject, number, catsForResolve) {

  if(error){
    console.error(error)
    return;
  }
  var catBreed = result.CommonPrefixes
  var s3ShortHair = catBreed[Math.floor(Math.random() * catBreed.length)]
  var certainBreed = s3ShortHair.Prefix
  var paramsCat = {
    Bucket: 'image.beansdrawer.com',
    Delimiter: "/",
    Prefix: certainBreed,
    MaxKeys: 1000000
  };

  s3.listObjects(paramsCat, function (error, innerResult) {
    if(error){
      console.error(error)
      return;
    }

    var s3BreedObjects = innerResult.Contents;
    var randIdxNum = Math.floor(Math.random()*s3BreedObjects.length)
    randIdxNum = randIdxNum == 0 ? randIdxNum + 1 : randIdxNum

    var s3Object = s3BreedObjects[randIdxNum];
    var s3File = 'https://image.beansdrawer.com/' + s3Object.Key;

    if(!catsForResolve.includes(s3File)) catsForResolve.push(s3File)

    if(catsForResolve.length == number){
      var responseObject = {status: 'success', message: catsForResolve};
      resolve(responseObject)
    }else{
      callback(error, result, resolve, reject, number, catsForResolve)
    }
  })
}

const imagesAnyBreedWithNumber = (number) => new Promise((resolve, reject)=> {

  // need 1 or more...
  if(number < 1){
    number = 1
  }

  const catsForResolve = []
  s3.listObjects(paramsBreed, (error, result) => callback(error, result, resolve, reject, number, catsForResolve))

})

module.exports = imagesAnyBreedWithNumber




