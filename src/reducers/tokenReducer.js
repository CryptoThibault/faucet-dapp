export const tokenReducer = (state, action) => {
  switch (action.type) {
    case "AMOUNT_TO_SEND":
      return {
        ...state,
        amountToSend: action.payload,
      }

    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      }

    case "TX_WAITING":
      return {
        ...state,
        txStatus: "Waiting for comfirmation",
      }

    case "TX_PENDING":
      return {
        ...state,
        txStatus: "Pending",
      }

    case "TRANSFER_SUCCESS":
      return {}
    default:
      throw new Error(`tokenReducer: wrong input in the reducer ${action.type}`)
  }
}
