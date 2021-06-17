import { useContext } from "react"
import { ContractsContext } from "../contexts/ContractsContext"

export const useFaucet = () => {
  const [, faucet] = useContext(ContractsContext)

  if (faucet === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [faucet]
}
