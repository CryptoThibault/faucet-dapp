import { useContext, useReducer } from "react";
import { ContractsContext } from "../contexts/ContractsContext";
import { faucetReducer } from "../reducers/faucetReducer";

export const useFaucet = () => {
  const [, faucet] = useContext(ContractsContext);
  const [faucetState, faucetDispatch] = useReducer(faucetReducer, {
    remainingSupply: "0",
    timeRemaining: "0",
    ownerAddress: "",
    erc20Address: "",
    amountReceived: "0",
    donation: "0",
  });
  if (faucet === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider");
  }
  return [faucet, faucetState, faucetDispatch];
};
