import { inject } from "inversify"
import { controller, httpGet, interfaces, next, request, response } from "inversify-express-utils"
import { TYPES } from "../di"
import TransactionService from "../services/transactionService"
import { NextFunction, Request, Response } from "express"
import logService from "../services/logService"

@controller("/estatistica")
export default class StatisticController implements interfaces.Controller {
    constructor(@inject(TYPES.TransactionService) private service: TransactionService) { }

    /**
     * @swagger
     * /api/estatistica:
     *   get:
     *     summary: Calcular estatísticas
     *     description: Endpoint que retorna as estatísticas das transações nos últimos 60 segundos.
     *     tags: [Estatísticas]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success
     */
    @httpGet("/")
    private getStatistics(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        logService.createLogInfo("Iniciando requisição das estatísticas")
        const obj = this.service.getStatistics()
        logService.createLogInfo("Estatísticas calculadas com sucesso")
        return res.json(obj)
        
    }
}