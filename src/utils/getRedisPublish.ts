import RedisPublish from "../pubsub/Publish"

let instance: RedisPublish | null = null

export default function getRedisPublish(): RedisPublish {
  if(!instance){
    instance = new RedisPublish()
  }
  return instance
}