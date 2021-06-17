export const tokenReducer = (state, action) => {
  switch (action.type) {
    case "TOKEN_INFO":
      console.log("TX OUT:" + action.txOut)
      const createList = (tab) => {
        let newTab = []
        for (let elem of tab) {
          newTab.push(elem.args)
        }
        return newTab
      }
      let tableau = createList(action.txOut)
      console.log(tableau)
      // console.log("TX IN:" + action.txIn[0].topics)
      return {
        ...state,
        tokenName: action.n,
        symbol: action.s,
        decimals: action.d,
        txList: tableau,
      }

    case "AMOUNT_TO_SEND":
      return {
        ...state,
        amountToSend: action.payload,
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
