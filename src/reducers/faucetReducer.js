export const faucetReducer = (state, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        remainingSupply: action.payload.a,
        timeRemaining: action.payload.b,
      };
    case "GET_TIME":
      return {
        ...state,
        timeRemaining: action.payload,
      };
    case "GET_CONTRACT":
      return {
        ...state,
        ownerAddress: action.payload.a,
        erc20Address: action.payload.b,
        amountSend: action.payload.c,
      };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};
