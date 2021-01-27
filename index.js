const express = require("express")
const app = express();
const logger = require("morgan")
const catRouter = require("./routers/catRouter")
const helmet = require('helmet')
const hpp = require('hpp');

if(process.env.NODE_ENV == "production"){
  app.use(logger("combined"))
  app.use(helmet())
  app.use(hpp())
}else{
  app.use(logger("dev"))
}

// UGLY CODE.. 코드를 아래와 같이 작성한 것을.. 후회하는 중...!
app.use("/api", catRouter)
app.use("/", express.Router()
.get("/*", (req, res) => res.redirect('/api')))

app.listen(4003, () => {
  console.log("Working...")
})