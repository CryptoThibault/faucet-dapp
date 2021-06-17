import { useContext, useReducer } from "react"
import { ContractsContext } from "../contexts/ContractsContext"
import { tokenReducer } from "../reducers/tokenReducer"

export const useFarahToken = () => {
  const farahtoken = useContext(ContractsContext)

  const [state, dispatch] = useReducer(tokenReducer, {
    address: "",
    amountToSend: 0,
    txStatus: "",
    sender: "",
    recipient: "",
    amount: 0,
  })

  if (farahtoken === undefined) {
    throw new Error(
      `It seems that you are trying to use ContractsProvider outside of its provider`
    )
  }

  return [farahtoken, state, dispatch]
}
