import { createContext } from "react"
import { useContract } from "web3-hooks"
import { farahTokenAddress, farahTokenAbi } from "../contracts/farahToken"
import { faucetAddress, faucetAbi } from "../contracts/faucet"

export const ContractsContext = createContext(null)

const ContractsContextProvider = ({ children }) => {
  const farahToken = useContract(farahTokenAddress, farahTokenAbi)
  const faucet = useContract(faucetAddress, faucetAbi)

  return (
    <ContractsContext.Provider value={[farahToken, faucet]}>
      {children}
    </ContractsContext.Provider>
  )
}

export default ContractsContextProvider
