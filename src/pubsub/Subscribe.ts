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
    this.client.on("subscribe", function(channel) {
      console.log(`Subcribe on ${channel}`)
    });
    
    this.client.on("message", (channel, data) => {
      if(channel === topic) {
        cb(JSON.parse(data))
      }
    })

    await subscribe(topic, this.client)
  }
}

export default new RedisSubscribe()
