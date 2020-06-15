import Queue from "./Queue"

export default async function combineQueues(queues: Queue[]): Promise<void> {
  await Promise.all(queues.map(queue => queue.process()))
}
