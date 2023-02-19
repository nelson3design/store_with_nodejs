import Cart from "../models/Cart"
import Transaction from "../models/Transaction"
import { v4 as uuidv4 } from 'uuid'
import PagarMeProvider from "../providers/pagarmeProvider";
import parsePhoneNumber from "libphonenumber-js"
class TransactionService{

    paymentProvider;
    constructor(paymentProvider){
        this.paymentProvider = paymentProvider || new PagarMeProvider()
    }
    async process({
        cartCode,
        paymentType,
        installments,
        customer,
        billing,
        creditCard
      
    }){

    const cart = await Cart.findOne({ cartCode })
    if(!cart){
        throw `Cart ${cartCode} was not found.`
    }

    const transaction = await Transaction.create({
        cartCode: cart.code,
        code: await uuidv4(),
        total:cart.price,
        paymentType,
        installments,
        status:"started",
        customerName: customer.name,
        customerEmail: customer.email,
        customerMobile: parsePhoneNumber(customer.mobile,"BR").format("E.164"),
        customerDocument: customer.document,
        billingAddress: billing.adress,
        billingNumber: billing.number,
        billingNeighborhood: billing.neighborhood,
        billingCity: billing.city,
        billingState: billing.state,
        billingZipCode: billing.zipCode,
    })
     // chamada do provider/getway
    const response = this.paymentProvider.process({
        transactionCode: transaction.code,
        total:transaction.total,
        paymentType,
        installments,
        creditCard,
        customer,
        billing
    })

    transaction.updateOne({
        transactionId:response.transactionId,
        status: response.status,
        processorResponse: response.processorResponse
    })


    return response

    }
}

export default TransactionService;