import "reflect-metadata"
import bodyParser from "body-parser"
import express, { Request, Response } from 'express'
import middlewares from "./middlewares"
import logService from "./services/logService"
import { di } from "./di"
import "./controllers"
import expressHealthcheck from "express-healthcheck"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./utils/swaggerSpec"


logService.createLogInfo("Iniciando aplicação")
logService.createLogInfo("Inserindo dependências")
const server = di.getInversifyServer()

logService.createLogInfo("Carregando configurações de ambiente")
const port = 3000

logService.createLogInfo("Configurando o servidor")
server.setConfig((app) => {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get("/v1/swagger.json", (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json")
    res.json(swaggerSpec)
  })
  app.use(bodyParser.json())
  app.use(express.json())
  app.use('/api/health', expressHealthcheck({
    healthy: function () {
      return { status: "API Funcionando" }
    }
  }))
})

logService.createLogInfo("Configurando o middlewares e tratativas de erro")
server.setErrorConfig((app) => {
  app.use(middlewares.notFound)
  app.use(middlewares.errorHandler)
})

const app = server.build().listen(port, () => {
  logService.createLogSuccess(`Aplicação iniciou na porta ${port}`)
})

export default app