import RedisPublish from "../pubsub/Publish"

const QUEUE_TOPIC = "@queue/main_topic"

type QueueFunction<T> = (data: T) => void

class Queue<T> {
  private name: string
  private cb: QueueFunction<T>

  public constructor(name: string, cb: QueueFunction<T>) {
    this.name = name
    this.cb = cb
  }

  public async enqueue(data: T): Promise<void> {
    await RedisPublish.publish(QUEUE_TOPIC, {
      name: this.name,
      data
    })
  }
}