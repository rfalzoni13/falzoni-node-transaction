import { inject } from "inversify"
import { controller, httpDelete, httpPost, interfaces, next, request, response } from "inversify-express-utils"
import { TYPES } from "../di"
import TransactionService from "../services/transactionService"
import { NextFunction, Request, Response } from "express"
import middlewares from "../middlewares"
import { transactionSchema } from "../validation"
import logService from "../services/logService"

@controller("/transacao")
export default class TransactionController implements interfaces.Controller {
    constructor(@inject(TYPES.TransactionService) private service: TransactionService) { }

    /**
     * @swagger
     * /api/transacao:
     *   post:
     *     summary: Registrar transação
     *     description: Endpoint que grava uma nova transação.
     *     tags: [Transação]
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: transaction
     *         required: true
     *         description: Objeto da transação
     *         schema:
     *           $ref: '#/components/schemas/transactionSchema'
     *     responses:
     *       201:
     *         description: Created
     *       400:
     *         description: Bad Request
     *       422:
     *         description: Unprocessable Entity
     */
    @httpPost("/", middlewares.validateSchema(transactionSchema))
    private receive(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        const list = this.service.receive(req.body)
        return res.status(201).json(list)
    }

    /**
     * @swagger
     * /api/transacao:
     *   delete:
     *     summary: Remover transações
     *     description: Endpoint que remove todas as transações registradas.
     *     tags: [Transação]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: Success
     */
    @httpDelete("/")
    private delete(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
        logService.createLogInfo("Iniciando requisição de limpeza de transações")
        this.service.clear()
        logService.createLogInfo("Transações removidas")
        return res.send()
    }
}