import "./config/env"
import { combineQueues } from "./lib"

import MailQueue from "./queues/Mail"
import ReportQueue from "./queues/Report"

combineQueues([MailQueue, ReportQueue])
  .then(() => console.log("Processing all queues"))
  .catch(console.error)