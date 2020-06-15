import { Queue } from "../lib"

interface Report {
  title: string
  description: string
}

function reportCallback(report: Report) {
  console.log("> New Report: ", report)
}

const reportQueue = new Queue<Report>("report", reportCallback)

export default reportQueue