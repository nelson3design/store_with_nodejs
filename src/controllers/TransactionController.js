import * as Yup from "yup"

class TransactionController {
    async create(req, res) {

        try {
              const {
                  cartCode,
                  paymentType,
                  installments,
                  total,
                  transactionId,
                  processorResponse,
                  customerEmail,
                  customerName,
                  customerMobile,
                  customerDocument,
                  billingAddress,
                  billingNumber,
                  billingNeighborhood,
                  billingCity,
                  billingState,
                  billingZipCode,
                  creditCardNumber,
                  creditCardExpiration,
                  creditCardHolderName,
                  creditCardCvv,
              }= req.body

              const schema = Yup.object({
                  cartCode: Yup.string().required(),
                  paymentType: Yup.mixed().oneOf(["billet", "credit_card"]).required(),
              })

              if(!(await schema.isValid(req.body))){
                 return res.status(400).json({error: "error on validate schema"})
              }

             res.status(200).json()

        } catch (error) {
            console.log(error)

            return res.status(500).json({ error: 'internal server error.' })

        }
    }
}

export default new TransactionController()