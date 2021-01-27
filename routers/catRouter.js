const express = require("express")
const router = express.Router()
const { randomImageAnyBreed,
  randomImageByBreed, imagesByBreedWithNumber,
  imagesAnyBreedWithNumber }  = require("../services/index")
/*
base url will be : 'https://cats.beansdrawer/api/
*/

// random cat image by any breed
router.get("/breeds/image/random", (req, res) => {
  randomImageAnyBreed().then(result => {
    res.json(result)
  }).catch(error => {
    res.json(error)
  })
})

// a number of random cat image by any breed
router.get("/breeds/image/random/:number", (req, res) => {
  const { number } = req.params
  if(!Number.isInteger(Number.parseFloat(number))) res.redirect(`/api/breeds/image/random/`)

  imagesAnyBreedWithNumber(Number.parseFloat(number)).then(result => {
    res.json(result)
  }).catch(error => {
    res.json(error)
  })
})

// random cat image by certain breed
router.get("/breed/:breed/random", (req, res) => {
  const { breed } = req.params
  randomImageByBreed(breed).then(result => {
    res.json(result)
  }).catch(error => {
    res.json(error)
  })
})

// a number of random cat image by certain breed
router.get("/breed/:breed/random/:number", (req, res) => {
  const { breed, number } = req.params
  if(!Number.isInteger(Number.parseFloat(number))) res.redirect(`/api/breed/${breed}/random/`)

  imagesByBreedWithNumber(breed, Number.parseFloat(number)).then(result => {
    res.json(result)
  }).catch(error => {
    res.json(error)
  })
})

router.get("/*", (req, res) => {
  res.json({
    status: "failed",
    message: 'maybe invalid request'
  })
})


module.exports = router;