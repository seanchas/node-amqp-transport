import msgpack from "msgpack"
import { pool } from "../utils"

const pack = payload => msgpack.pack(payload)

const unpack = message => msgpack.unpack(message.content)

const send = async (channel, sendQueue, payload) => {
  channel.sendToQueue(sendQueue, payload)
}

export default async (queue, dispatch) => {
  const channel = await pool.acquire()
  await channel.assertQueue(queue, { durable: false })

  channel.prefetch(1)

  channel.consume(
    queue,
    async message => {
      const payload = await dispatch(unpack(message))

      send(
        channel,
        message.properties.replyTo,
        pack(payload),
      )
    },
    { noAck: true }
  )
}
