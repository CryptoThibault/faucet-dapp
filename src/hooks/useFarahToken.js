import { useContext, useEffect, useReducer } from "react"
import { Web3Context } from "web3-hooks"
import { ContractsContext } from "../contexts/ContractsContext"
import { tokenReducer } from "../reducers/tokenReducer"
import { useToast } from "@chakra-ui/toast"
import { ethers } from "ethers"

export const useFarahToken = () => {
  const toast = useToast()
  const [web3State] = useContext(Web3Context)
  const [farahtoken] = useContext(ContractsContext)

  const [state, dispatch] = useReducer(tokenReducer, {
    tokenName: "",
    symbol: "",
    decimals: 0,
    address: "",
    fromAddress: "",
    fromTransfer: false,
    amountToSend: 0,
    txStatus: "",
    sender: "",
    recipient: "",
    amount: 0,
    txList: [],
    allowance: 0,
  })

  useEffect(() => {
    if (farahtoken) {
      const getInfo = async () => {
        try {
          let n = await farahtoken.name()
          let s = await farahtoken.symbol()
          let d = await farahtoken.decimals()

          // filter all farahtoken transfers FROM the account
          let txOut = await farahtoken.filters.Transfer(web3State.account, null)
          // filter all farahtoken transfers TO the account
          let txIn = await farahtoken.filters.Transfer(null, web3State.account)
          // list all Transfer event from me
          txOut = await farahtoken.queryFilter(
            txOut /*, block range or last number */
          )
          // list all Transfer event to me
          txIn = await farahtoken.queryFilter(txIn)
          dispatch({ type: "TOKEN_INFO", n, s, d, txOut, txIn })
        } catch (e) {
          console.log(e)
        }
      }
      getInfo()
    }
  }, [farahtoken, web3State.account])

  useEffect(() => {
    if (farahtoken) {
      const cb = (sender, recipient, amount) => {
        if (sender.toLowerCase() === web3State.account.toLowerCase()) {
          toast({
            title: "Transfer done",
            description: `${sender} send ${ethers.utils.formatEther(
              amount
            )} to ${recipient}\nSee on EtherScan: TX_HASH`,
            status: "success",
            position: "bottom",
            duration: "4000",
            isClosable: true,
          })
        }
      }
      farahtoken.on("Transfer", cb)
      return () => farahtoken.off("Transfer", cb)
    }
  }, [farahtoken, toast, web3State.account])

  if (farahtoken === undefined) {
    throw new Error(
      `It seems that you are trying to use ContractsProvider outside of its provider`
    )
  }

  return [farahtoken, state, dispatch]
}
