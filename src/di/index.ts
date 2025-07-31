import { Container } from "inversify"
import { InversifyExpressServer } from "inversify-express-utils"
import TransactionService from "../services/transactionService"

const TYPES = {
    TransactionService: Symbol.for("TransactionService")
}

function getContainer(): Container {
    const container = new Container()

    container.bind<TransactionService>(TYPES.TransactionService).to(TransactionService).inSingletonScope()

    return container
}

const di = {
    getInversifyServer: function (): InversifyExpressServer {
        const container = getContainer()
        return new InversifyExpressServer(container, null, { rootPath: '/api' })
    }
}

export {
    di,
    TYPES
}