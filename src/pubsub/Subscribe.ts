import redis, { RedisClient } from "redis"


type SubscribeFunction = (data: object) => void

async function subscribe(topic: string, client: RedisClient): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    client.subscribe(topic, (err) => {
      if(err && err instanceof Error) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

class RedisSubscribe {
  private client: RedisClient

  public constructor() {
    this.client = redis.createClient({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST
    })
  }

  public async subscribe(topic: string, cb: SubscribeFunction): Promise<void> {
    await subscribe(topic, this.client)
    this.client.on("message", (channel, data) => {
      if(channel === topic) {
        cb(JSON.parse(data))
      }
    })

    this.client.on("subscribe", function(channel, count) {
      console.log(channel, count)
    });
  }
}

export default new RedisSubscribe()
