import AMQP from "amqplib"
import GenericPool from "generic-pool"

const ConnectionFactory = {
  create: () => {
    return AMQP.connect(process.env.AMQP_CONNECT)
  },
  destroy: connection => {
    connection.close()
  },
}

const ConnectionPool = GenericPool.createPool(ConnectionFactory, {
  max: 1,
})

const ChannelFactory = {
  create: async () => {
    const connection = await ConnectionPool.acquire()
    const channel = await connection.createChannel()
    ConnectionPool.release(connection)
    return channel
  },
  destroy: channel => {
    channel.close()
  },
}

const ChannelPool = GenericPool.createPool(ChannelFactory, {
  max: 10,
})

export default ChannelPool
