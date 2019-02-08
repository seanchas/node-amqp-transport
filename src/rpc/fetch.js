import msgpack from "msgpack"
import { pool } from "../utils"

const pack = payload => msgpack.pack(payload)

const unpack = message => msgpack.unpack(message.content)

const send = (channel, sendQueue, recvQueue, payload) => {
  return channel.sendToQueue(sendQueue, payload, {
    replyTo: recvQueue,
  })
}

const consume = (channel, recvQueue) => {
  return new Promise(resolve => {
    channel.consume(recvQueue, resolve, {
      noAck: true,
    })
  })
}

const assertQueue = channel => {
  return channel
    .assertQueue(null, { exclusive: true })
    .then(response => response.queue)
}

const fetch = (sendQueue, payload) => {
  return pool.use(async channel => {
    const recvQueue = await assertQueue(channel)

    send(channel, sendQueue, recvQueue, pack(payload))

    return consume(channel, recvQueue)
      .then(unpack)
      .finally(() => {
        channel.deleteQueue(recvQueue)
      })
  })
}

export default fetch
