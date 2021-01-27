const { s3, paramsBreed } = require('./awsConfig')

function callback(error, result, resolve, reject, number, catsForResolve, paramsCat) {

  if(error){
    console.error(error)
    return;
  }

  if(result.Contents.length < 1) reject({status: 'failed', message: 'invalid request'});

  s3.listObjects(paramsCat, function (error, innerResult) {
    if(error){
      console.error(error)
      return;
    }

    var s3BreedObjects = innerResult.Contents;

    if(s3BreedObjects.length - 1 < number) return reject({status: 'failed', message: 'Please lower the number'});

    var randIdxNum = Math.floor(Math.random()*s3BreedObjects.length)
    randIdxNum = randIdxNum == 0 ? randIdxNum + 1 : randIdxNum

    var s3Object = s3BreedObjects[randIdxNum];
    var s3File = 'https://image.beansdrawer.com/' + s3Object.Key;

    if(!catsForResolve.includes(s3File)) catsForResolve.push(s3File)

    if(catsForResolve.length == number){
      var responseObject = {status: 'success', message: catsForResolve};
      resolve(responseObject)
    }else{
      callback(error, result, resolve, reject, number, catsForResolve, paramsCat)
    }
  })
}

const imagesByBreedWithNumber = (breed, number) => new Promise((resolve, reject)=> {

  // need 1 or more...
  if(number < 1){
    number = 1
  }

  var certainBreed = `short-hair/${breed}/`
  
  var paramsCat = {
    Bucket: paramsBreed.Bucket,
    Delimiter: paramsBreed.Delimiter,
    Prefix: certainBreed,
    MaxKeys: paramsBreed.MaxKeys
  };

  const catsForResolve = []
  s3.listObjects(paramsCat, (error, result) => callback(error, result, resolve, reject, number, catsForResolve, paramsCat))

})

module.exports = imagesByBreedWithNumber




