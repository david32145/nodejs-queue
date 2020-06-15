import RedisPublish from "../pubsub/Publish"

type QueueFunction<T> = (data: T) => void

class Queue<T = any> {
  private _name: string
  private _cb: QueueFunction<T>

  public constructor(name: string, cb: QueueFunction<T>) {
    this._name = name
    this._cb = cb
  }

  public async enqueue(payload: T): Promise<void> {
    await RedisPublish.publish({
      name: this._name,
      payload
    })
  }
  
  public get name() : string {
    return this._name
  }

  public get cb() : QueueFunction<T> {
    return this._cb
  }
   
}

export default Queue