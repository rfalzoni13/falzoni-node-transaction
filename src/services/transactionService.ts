import SummaryStatistics from "../models/summaryStatistics"
import Transaction from "../models/transaction"
import { dateUtil } from "../utils/dateUtil"
import StopWatch from "../utils/stopWatch"
import logService from "./logService"

export default class TransactionService {
    private transactions?: Transaction[]

    constructor() {
        this.transactions = this.transactions || []
    }

    get getTransactions(): Transaction[] {
        return this.transactions!
    }

    receive(transaction: Transaction) {
        logService.createLogInfo("Validando transação")

        //Convertendo a data para o formato Date (oriunda do Json)
        if(!(transaction.dataHora instanceof Date)) {
            transaction.dataHora = dateUtil.convertDateFromString(transaction.dataHora!.toString())
        }
        this.transactions?.push(transaction)
    }

    clear() {
        logService.createLogInfo("Limpando transações registradas")
        this.transactions = []
    }

    getStatistics() {
        logService.createLogInfo("Calculando estatísticas das transações")

        const stopWatch = new StopWatch()
        stopWatch.start()

        const now = new Date()
        const sixtySecondsAgo = new Date(now.getTime() - 60 * 1000)
        
        const filteredTransactions = this.transactions!.filter(transaction => 
            transaction.dataHora! >= sixtySecondsAgo && transaction.dataHora! < now
        )

        const statistics: SummaryStatistics = {
            count: filteredTransactions.length,
            sum: filteredTransactions.reduce((sum, transaction) => sum + transaction.valor!, 0),
            average: filteredTransactions.length > 0 ? 
                filteredTransactions.reduce((sum, transaction) => sum + transaction.valor!, 0) / filteredTransactions.length : 
                0,
            max: filteredTransactions.reduce((max, transaction) => Math.max(max, transaction.valor!), 0),
            min: filteredTransactions.reduce((min, transaction) => Math.min(min, transaction.valor!), Infinity)
        }

        stopWatch.stop()
        logService.createLogInfo(`Estatísticas calculadas em ${stopWatch.getDurationInMilliseconds()}ms`)

        return statistics
    }
}