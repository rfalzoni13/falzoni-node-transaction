import swaggerJsdoc from "swagger-jsdoc"

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Falzoni Transactions Express",
      description: "Api de demonstração de transações com Node.js, Express e TypeScript",
      version: "v1",
    },
    externalDocs: {
      description: "v1/swagger.json",
      url: "/v1/swagger.json",
    },
    components: {
      schemas: {
        transactionSchema: {
        title: 'Transaction',
        type: 'object',
        properties: {
          valor: {
            type: 'number',
            format: 'decimal',
            description: 'Valor da transação',
            example: 100.00
          },
          dataHora: {
            type: 'string',
            format: 'date-time',
            description: 'Data de registro da transação',
            example: '2025-01-08T19:31:55.000'
          }
        },
        additionalProperties: false,
        description: 'Objeto da transação'
      }}
    }
  },
  apis: ["./src/controllers/**/*.ts"],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec