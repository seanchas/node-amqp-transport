import "./env"
import { rpc } from "../src"

rpc.serve("chain", async message => {
  console.log(message)
  return { b: message.a }
})
