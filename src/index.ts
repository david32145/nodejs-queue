import * as redis from "redis"

const client = redis.createClient({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST
})

client.on("connect", function(...arg: any[]) {
  console.log("connected")
})