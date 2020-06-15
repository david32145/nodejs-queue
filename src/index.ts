import "./config/env"
import Queue from "./queue/Queue"

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

queue
  .process()
  .then(() => queue2.process())
  .then(() => main())
  .then()
  .catch(console.error)


// const redis = require("redis");

// const subscriber = redis.createClient();
// const publisher = redis.createClient();

// let messageCount = 0;

// subscriber.on("subscribe", function(channel, count) {
//   publisher.publish("a channel", "a message");
//   publisher.publish("a channel", "another message");
// });

// subscriber.on("message", function(channel, message) {
//   messageCount += 1;

//   console.log("Subscriber received message in channel '" + channel + "': " + message);

//   if (messageCount === 2) {
//     subscriber.unsubscribe();
//     subscriber.quit();
//     publisher.quit();
//   }
// });

// subscriber.subscribe("a channel");