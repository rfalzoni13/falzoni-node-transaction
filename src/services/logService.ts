import { dateUtil } from "../utils/dateUtil"

const logService = {
    createLogInfo: (message: String) => console.log("\x1b[36m%s\x1b[0m", `[${dateUtil.getDate()}] [INFO] ${message}`),
    createLogSuccess: (message: String) => console.log("\x1b[32m%s\x1b[0m", `[${dateUtil.getDate()}] [SUCCESS] ${message}`),
    createLogWarning: (message: String) => console.warn("\x1b[33m%s\x1b[0m", `[${dateUtil.getDate()}] [WARNING] ${message}`),
    createLogError: (message: String) => console.error("\x1b[31m%s\x1b[0m", `[${dateUtil.getDate()}] [ERROR] ${message}`)
}

export default logService