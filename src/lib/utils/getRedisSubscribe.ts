import RedisSubscribe from "../pubsub/Subscribe"

let instance: RedisSubscribe | null = null

export default function getRedisSubscribe(): RedisSubscribe {
  if(!instance){
    instance = new RedisSubscribe()
  }
  return instance
}