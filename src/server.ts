import express from "express"
import multer from "multer"

const app = express()
const upload = multer()


app.get('/', (req, res) => {
  res.send("hellooooooooooooo")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})