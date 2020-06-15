import redis, { RedisClient } from "redis"

const QUEUE_TOPIC = "@queue/main_topic"

type SubscribeFunction = (data: any) => void

type QueueData = {
  name: string
  payload: object
}

async function subscribe(client: RedisClient): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    client.subscribe(QUEUE_TOPIC, (err) => {
      if(err && err instanceof Error) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export default class RedisSubscribe {
  private client: RedisClient

  public constructor() {
    this.client = redis.createClient({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST
    })
  }

  public async subscribe(queueName: string, cb: SubscribeFunction): Promise<void> {
    this.client.on("message", (channel, data) => {
      const obj: QueueData = JSON.parse(data)
      if(channel === QUEUE_TOPIC && obj.name === queueName) {
        cb(obj.payload)
      }
    })

    await subscribe(this.client)
  }
}
