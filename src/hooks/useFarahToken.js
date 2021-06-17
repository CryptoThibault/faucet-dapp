import { useContext } from "react";
import { ContractsContext } from "../contexts/ContractsContext";

export const useFarahToken = () => {
  const [farahtoken] = useContext(ContractsContext);

  if (farahtoken === undefined) {
    throw new Error(
      `It seems that you are trying to use ContractsProvider outside of its provider`
    );
  }

  return [farahtoken];
};
