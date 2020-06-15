import redis, { RedisClient } from "redis"

const QUEUE_TOPIC = "@queue/main_topic"

async function publish(data: object, client: RedisClient): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    client.publish(QUEUE_TOPIC, JSON.stringify(data), (err) => {
      if(err && err instanceof Error) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export default class RedisPublish {
  private client: RedisClient

  public constructor() {
    this.client = redis.createClient({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST
    })
  }

  public async publish(data: object): Promise<void> {
    await publish(data, this.client)
  }
}

