import RedisPublish from "../pubsub/Publish"
import RedisSubscribe from "../pubsub/Subscribe"

type QueueFunction<T> = (data: T) => void

class Queue<T> {
  private name: string
  private cb: QueueFunction<T>

  public constructor(name: string, cb: QueueFunction<T>) {
    this.name = name
    this.cb = cb
  }

  public async enqueue(payload: T): Promise<void> {
    await RedisPublish.publish({
      name: this.name,
      payload
    })
  }

  public async process(): Promise<void> {
    await RedisSubscribe.subscribe(this.name, this.cb)
  }
}

export default Queue