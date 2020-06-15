import RedisSubscribe from "../pubsub/Subscribe"
import Queue from "./Queue"

export default async function process(queue: Queue): Promise<void> {
  await RedisSubscribe.subscribe(queue.name, queue.cb)
}