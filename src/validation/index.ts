import { AnyObject, date, number, object, ObjectSchema } from 'yup'
import Transaction from '../models/transaction'


const transactionSchema: ObjectSchema<Transaction, AnyObject, any, ""> = object({
    valor: number().defined("Valor é obrigatório").min(0, "Valor não pode ser negativo"),
    dataHora: date().nullable("Data da transação é obrigatória").max(new Date(), 'Data e hora da transação não pode ser no futuro'),
})

export {
    transactionSchema
}