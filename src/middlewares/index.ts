import { NextFunction, Request, Response } from "express"
import logService from "../services/logService"

const middlewares = {
  notFound: function (req: any, res: any, next: any) {
    let statusCode = 404
    logService.createLogError('Método ou serviço não encontrado')
    const error = { status: statusCode, message: 'Método ou serviço não encontrado' }
    next(error)
  },

  errorHandler: function (err: any, req: any, res: any, next: any) {
    if (err.stack !== undefined) {
      logService.createLogError(err.stack)
    }
    res.status(err.status || 500).send()
  },
  
  validateSchema: (schema: any) => async function (req: Request, res: Response, next: NextFunction) {
    try {
      if(Object.keys(req.body).length === 0) {
        logService.createLogError("Objeto nulo ou inválido")
        res.status(400).send()
        return
      }
      await schema.validate(req.body, { abortEarly: false })
      next() // Proceed to the next middleware or route
    } catch (error: any) {
      const errors = error.inner.map((err: any) => ({
        field: err.path,
        message:  err.message
      }))
      logService.createLogError(JSON.stringify(errors))
      res.status(422).send()
    }
  }
}

export default middlewares