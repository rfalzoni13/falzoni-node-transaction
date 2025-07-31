import moment from "moment"
import TransactionService from "../../src/services/transactionService"

describe("Transaction Service", () => {
    const transactionService: TransactionService = new TransactionService()
    it("should be sucess when receive transaction", async () => {
        transactionService.receive({
                        valor: 1000,
                        dataHora: moment(Date.parse("2025-07-30T14:10:05.000Z")).toDate(),
                    })
        expect(transactionService.getTransactions.length).toBeGreaterThan(0)
        expect(transactionService.getTransactions).not.toEqual([])
    })
    it("should be sucess when clear transactions", async () => {
        transactionService.clear()
        expect(transactionService.getTransactions.length).not.toBeGreaterThan(0)
        expect(transactionService.getTransactions).toEqual([])
    })
    it("should be sucess when calculate statistics", async () => {
        transactionService.clear()

        const date = new Date();

        date.setSeconds(date.getSeconds() - 10);
        transactionService.receive({
                        valor: 1000,
                        dataHora: moment(date).toDate(),
                    })
        date.setSeconds(date.getSeconds() - 10);
        transactionService.receive({
                        valor: 2000,
                        dataHora: moment(date).toDate(),
                    })
        date.setSeconds(date.getSeconds() - 10);
        transactionService.receive({
                        valor: 1000,
                        dataHora: moment(date).toDate(),
                    })
        const summaryStatistics = transactionService.getStatistics();
        expect(summaryStatistics).toBeDefined();
        expect(summaryStatistics.count).toBe(3);
        expect(summaryStatistics.sum).toBe(4000);
        expect(Math.round(summaryStatistics.average * 100) / 100).toBe(1333.33);
        expect(summaryStatistics.max).toBe(2000);
        expect(summaryStatistics.min).toBe(1000);
    })
})