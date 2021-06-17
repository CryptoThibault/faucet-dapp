export const tokenReducer = (state, action) => {
  switch (action.type) {
    case "TOKEN_INFO":
      function historyList(txIn, txOut) {
        let txTab = []
        for (let elem of txIn) {
          let txHash = elem.getTransaction(this)
          txTab.push({
            blockNumber: elem.blockNumber,
            event: elem.event,
            amount: elem.args["value"].toString(),
            from: elem.args["from"],
            to: elem.args["to"],
            txHash,
          })
        }
        for (let elem of txOut) {
          let txHash = elem.getTransaction(this)
          txTab.push({
            blockNumber: elem.blockNumber,
            event: elem.event,
            amount: elem.args["value"].toString(),
            from: elem.args["from"],
            to: elem.args["to"],
            txHash,
          })
        }
        return txTab
      }
      return {
        ...state,
        tokenName: action.n,
        symbol: action.s,
        decimals: action.d,
        txList: historyList(action.txIn, action.txOut),
      }

    case "AMOUNT_TO_SEND":
      return {
        ...state,
        amountToSend: action.payload,
      }

    case "SET_TRANSFER_FROM":
      return {
        ...state,
        fromTransfer: !state.fromTransfer,
      }

    case "CHANGE_FROM_ADDRESS":
      return {
        ...state,
        fromAddress: action.payload,
      }

    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      }

    case "GET_ALLOWANCE":
      return {
        ...state,
        allowance: action.payload,
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
      return {
        ...state,
        txStatus: "Success",
      }

    case "TX_FAILURE":
      return {
        ...state,
        txStatus: `Failed with ${action.payload.message}`,
      }
    default:
      throw new Error(`tokenReducer: wrong input in the reducer ${action.type}`)
  }
}
