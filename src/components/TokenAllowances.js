import {
  Text,
  FormControl,
  FormLabel,
  Switch,
  Flex,
  InputGroup,
  Input,
  InputLeftAddon,
  Button,
  Alert,
  AlertIcon,
  InputRightAddon,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useFarahToken } from "../hooks/useFarahToken"

const TokenAllowances = () => {
  const [farahtoken, tokenState, tokenDispatch] = useFarahToken()
  const { address, allowance, fromAddress, amount, txStatus } = tokenState

  const handleCheckAllowance = async () => {
    console.log(fromAddress)
    console.log(address)
    try {
      let allowance = await farahtoken.allowance(fromAddress, address)
      tokenDispatch({
        type: "GET_ALLOWANCE",
        payload: ethers.utils.formatEther(allowance.toString()),
      })
    } catch (e) {
      console.log(e)
      tokenDispatch({ type: "TX_FAILURE", payload: e })
    }
  }

  const handleChangeAllowance = async (action) => {
    // message de confirmation
    console.log(amount)
    console.log(address)

    try {
      let tx
      tokenDispatch({ type: "TX_WAITING" })
      switch (action) {
        case "increase":
          tx = await farahtoken.increaseAllowance(
            address,
            ethers.utils.parseEther(amount.toString())
          )
          tokenDispatch({ type: "TX_PENDING" })
          break

        case "decrease":
          tx = await farahtoken.decreaseAllowance(
            address,
            ethers.utils.parseEther(amount.toString())
          )
          tokenDispatch({ type: "TX_PENDING" })
          break

        case "approve":
          tx = await farahtoken.approve(
            address,
            ethers.utils.parseEther(amount.toString())
          )
          tokenDispatch({ type: "TX_PENDING" })
          break
        default:
          return 0
      }
      await tx.wait()
      tokenDispatch({ type: "TX_SUCCESS" })
    } catch (e) {
      console.log(e)
      tokenDispatch({ type: "TX_FAILURE", payload: e })
    }
  }

  return (
    <>
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="1.5rem"
        as="h3"
        mb="1rem"
      >
        Token allowances
      </Text>
      <InputGroup mb="1rem" justifyContent={{ base: "center", xl: "start" }}>
        <Input
          value={address}
          maxW="20%"
          borderEndRadius="0"
          type="text"
          bg="white"
          placeholder="0x0000...000"
          onChange={(e) =>
            tokenDispatch({ type: "CHANGE_ADDRESS", payload: e.target.value })
          }
        />
        <InputRightAddon borderEndRadius="0" children="spend for:" />
        <Input
          value={fromAddress}
          maxW="20%"
          borderRadius="0"
          type="text"
          bg="white"
          placeholder="0x0000...000"
          onChange={(e) =>
            tokenDispatch({
              type: "CHANGE_FROM_ADDRESS",
              payload: e.target.value,
            })
          }
        />
        <Button onClick={handleCheckAllowance} borderStartRadius="0">
          Check
        </Button>
      </InputGroup>
      <Flex
        flexDirection={{ base: "column", xl: "row" }}
        mb="2rem"
        alignItems="center"
        justifyContent={{ base: "center", xl: "start" }}
      >
        <Text minW="15%" display="flex" mb="1rem" me="1rem" fontSize="1.2rem">
          Allowance: {allowance} FRT
        </Text>
        <Flex my="auto">
          <Button
            mb="1rem"
            loadingText={txStatus}
            isLoading={
              txStatus.startsWith("Waiting") || txStatus.startsWith("Pending")
            }
            onClick={() => handleChangeAllowance("increase")}
            me="1rem"
          >
            Increase allowance
          </Button>
          <Button
            mb="1rem"
            loadingText={txStatus}
            isLoading={
              txStatus.startsWith("Waiting") || txStatus.startsWith("Pending")
            }
            onClick={() => handleChangeAllowance("approve")}
            me="1rem"
          >
            Approve
          </Button>
          <Button
            mb="1rem"
            loadingText={txStatus}
            isLoading={
              txStatus.startsWith("Waiting") || txStatus.startsWith("Pending")
            }
            onClick={() => handleChangeAllowance("decrease")}
            me="1rem"
          >
            Decrease allowance
          </Button>
        </Flex>
        <InputGroup mb="1rem" justifyContent={{ base: "center", xl: "start" }}>
          <InputLeftAddon borderEndRadius="0" children="amount:" />
          <Input
            value={amount}
            maxW="20%"
            borderStartRadius="0"
            type="number"
            bg="white"
            onChange={(e) =>
              tokenDispatch({
                type: "CHANGE_AMOUNT_ALLOWANCE",
                payload: e.target.value,
              })
            }
          />
        </InputGroup>
      </Flex>
      {/* APPROVE UP DOWN TOTAL SUPLLY */}
    </>
  )
}

export default TokenAllowances
