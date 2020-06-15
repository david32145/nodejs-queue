<p align="center">

  # NodeJS Queue
  
  This app uses NodeJS and Redis. The queue tasks are an important features in server, the use cases like _Mail send_ or _Report generate_ are processes that not is recommended doing in http server for performance reasons. Therefore, the http server publishes only the task to _Redis_
  and server that process the tasks consumes them from _Redis_ and processes.

</p>

## 👨🏼‍💻 Development Contact

David Nascimento

* [Github](https://github.com/david32145)
* [nascimento32145@gmail.com](https://gmail.com)

## 🚀 Technologies

* ts-node-dev; 
* dotenv; 
* typescript; 
* redis; 
* express; 

## 🎌 What I've learned

* The queue/job taks; 
* Environment vars; 
* Redis pub/sub; 

## 🎥 How Usage

Declare the `Queue`.

``` ts
import { Queue } from "../lib"

interface Mail {
  to: string
  from: string
  content: string
}

function mailCallback(mail: Mail) {
  console.log("> New Mail: ", mail)
}

const mailQueue = new Queue<Mail>("mail", mailCallback)

export default mailQueue
```

And enqueue `Queue`.

```ts
import MailQueue from "../queues/Mail.ts"

await MailQueue.enqueue({
    content: String(body.content),
    from: String(body.from),
    to: String(body.to),
  })
```

You can be view the full example into `src/server.ts`.

## ✋🏻 Prerequisites

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/pt-BR/docs/install)
* [Redis](https://redis.io/)

## 🔥 Install and Running

1. Config you environment;
2. Git clone `git clone https://github.com/david32145/nodejs-queue`; 
3. Run `yarn install` or `npm install` for install dependencies; 
4. Copy .env.example to .env and fill with your config. Below an example of `.env` ; 

``` env
REDIS_HOST=localhost
REDIS_PORT=6379
```
5. Run `yarn dev:queue` or `npm run dev:queue` 
to raise the task server `queues`;
6. Run `yarn dev:server` or `npm run dev:server` 
to raise the task server `queues`;
7. Edit `src/index.ts` or `src/queue.ts` and start the game.
