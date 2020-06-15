import getRedisPublish from "../utils/getRedisPublish"
import getRedisSubscribe from "../utils/getRedisSubscribe"

type QueueFunction<T> = (data: T) => void

class Queue<T = any> {
  private name: string
  private cb: QueueFunction<T>

  public constructor(name: string, cb: QueueFunction<T>) {
    this.name = name
    this.cb = cb
  }

  public async enqueue(payload: T): Promise<void> {
    const client = getRedisPublish()
    await client.publish({
      name: this.name,
      payload
    })
  }

  public async process(): Promise<void> {
    const client = getRedisSubscribe()
    await client.subscribe(this.name, this.cb)
  }
}

export default Queue