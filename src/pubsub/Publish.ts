import redis, { RedisClient } from "redis"


async function publish(topic: string, data: object, client: RedisClient): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    client.publish(topic, JSON.stringify(data), (err) => {
      if(err && err instanceof Error) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

class RedisPublish {
  private client: RedisClient

  public constructor() {
    this.client = redis.createClient({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST
    })
  }

  public async publish(topic: string, data: object): Promise<void> {
    await publish(topic, data, this.client)
  }
}

export default new RedisPublish()
