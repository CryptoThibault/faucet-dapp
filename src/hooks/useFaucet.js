import { ethers } from "ethers"
import { useContext, useEffect, useReducer } from "react"
import { Web3Context } from "web3-hooks"
import { ContractsContext } from "../contexts/ContractsContext"
import { faucetReducer } from "../reducers/faucetReducer"
import { useToast } from "@chakra-ui/toast"

export const useFaucet = () => {
  const toast = useToast()
  const [web3State] = useContext(Web3Context)
  const [farahtoken, faucet] = useContext(ContractsContext)
  const [faucetState, faucetDispatch] = useReducer(faucetReducer, {
    remainingSupply: "0",
    timeRemaining: "0",
    ownerAddress: "",
    erc20Address: "",
    amountReceived: "0",
    donation: "0",
    faucetStatus: "",
  })

  useEffect(() => {
    if (faucet) {
      const cb = (sender, recipient, amount) => {
        if (sender.toLowerCase() === web3State.account.toLowerCase()) {
          toast({
            title: "Transfer done",
            description: `${sender} send ${ethers.utils.formatEther(
              amount
            )} to ${recipient}\nSee on EtherScan: TX_HASH`,
            status: "success",
            position: "bottom",
            duration: "10000",
            isClosable: true,
          })
        }
      }
      farahtoken.on("Transfer", cb)
      return () => {
        farahtoken.off("Transfer", cb)
      }
    }
  }, [faucet, farahtoken, web3State.account, toast])

  if (faucet === undefined) {
    throw new Error("You try to use ContractsContext outside of his provider")
  }
  return [faucet, faucetState, faucetDispatch]
}
