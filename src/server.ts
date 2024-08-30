
import express from "express"
import { routes } from "./infra/http/routes"
import cors from "cors"

const app = express()

app.use(express.json({limit: '500mb'}))
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})