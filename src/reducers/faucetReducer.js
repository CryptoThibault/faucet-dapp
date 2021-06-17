export const faucetReducer = (state, action) => {
  switch (action.type) {
    case "FAUCET_INFO":
      return {
        ...state,
        remainingSupply: action.payload.a,
        timeRemaining: action.payload.b,
        ownerAddress: action.payload.c,
        erc20Address: action.payload.d,
        amountReceived: action.payload.e,
      };
    case "GET_TOKEN":
      return {
        ...state,
        remainingSupply: action.payload.a,
        timeRemaining: action.payload,
      };
    case "GET_TIME":
      return {
        ...state,
        timeRemaining: action.payload,
      };
    case "CHANGE_DONATION":
      return {
        ...state,
        donation: action.payload,
      };
    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
};
