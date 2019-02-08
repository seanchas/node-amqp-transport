import "./env"
import { rpc } from "../src/"

let i = 0

const fetch = () => {
  const a = ++i
  rpc.fetch("chain", { a }).then(response => {
    console.log(`Sent: ${a}, Received`, response)
  })
}


fetch()
fetch()
fetch()
fetch()
fetch()
fetch()
fetch()
fetch()
fetch()
fetch()
