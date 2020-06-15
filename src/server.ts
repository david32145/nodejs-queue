import "./config/env"

import MailQueue from "./queues/Mail"
import ReportQueue from "./queues/Report"

import express from "express"

const app = express()

app.use(express.json())

app.get("/mail", async (req, res) => {
  const body = req.body
  await MailQueue.enqueue({
    content: String(body.content),
    from: String(body.from),
    to: String(body.to),
  })

  return res.status(200).json({
    content: String(body.content),
    from: String(body.from),
    to: String(body.to),
  })
})

app.get("/report", async (req, res) => {
  const body = req.body
  await ReportQueue.enqueue({
    title: String(body.title),
    description: String(body.description),
  })

  return res.status(200).json({
    title: String(body.title),
    description: String(body.description),
  })
})

const SERVER_PORT = process.env.PORT || 3333

app.listen(SERVER_PORT, function (...err: any[]) {
  if (err && err.length) {
    console.log('An error ocurrent...')
    console.error(err)
  } else {
    console.log(`Server is running in http://localhost:${SERVER_PORT}`)
  }
})