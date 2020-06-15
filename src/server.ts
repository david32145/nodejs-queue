import "./config/env"

import MailQueue from "./queues/Mail"
import ReportQueue from "./queues/Report"

import express from "express"

const app = express()

const SERVER_PORT = process.env.PORT || 3333

app.listen(SERVER_PORT, function(...err: any[]) {
  if(err && err.length) {
    console.log('An error ocurrent...')
    console.error(err)
  } else {
    console.log(`Server is running in http://localhost:${SERVER_PORT}`)
  }
})