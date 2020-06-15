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