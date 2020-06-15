import { Queue } from "../lib"

interface Report {
  title: string
  description: string
}

function reportCallback(report: Report) {
  console.log("> New Report: ", report)
}

const reportQueue = new Queue<Report>("mail", reportCallback)

export default reportQueue