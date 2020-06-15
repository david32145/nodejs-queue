import Queue from "./Queue"
import processQueue from "./processQueue"

export default async function combineQueues(queues: Queue[]): Promise<void> {
  await Promise.all(queues.map(queue => processQueue(queue)))
}