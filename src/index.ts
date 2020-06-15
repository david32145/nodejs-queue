import "./config/env"
import Queue from "./queue/Queue"
import combineQueues from "./queue/combineQueues"

type QueuePayload = {
  ok: boolean
}

const queue = new Queue<QueuePayload>("report", data => {
  console.log('> report: ', data)
})

const queue2 = new Queue<QueuePayload>("report2", data => {
  console.log('> report2: ', data)
})

async function main() {
  await queue.enqueue({
    ok: true,
  })

  await queue2.enqueue({
    ok: false
  })
}

combineQueues([queue, queue2])
  .then(() => main())
  .then()
  .catch(console.error)
