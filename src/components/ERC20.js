import {
  Box,
  Text,
  Button,
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useFarahToken } from "../hooks/useFarahToken"

const ERC20 = () => {
  const [farahtoken, tokenState, tokenDispatch] = useFarahToken()
  const { address, amountToSend } = tokenState

  const handleSendToken = async () => {
    tokenDispatch({ type: "TX_WAITING" })
    try {
      let tx = await farahtoken.transfer(
        address,
        ethers.utils.parseEther(amountToSend.toString())
      )
      tokenDispatch({ type: "TX_PENDING" })
      await tx.wait()
      tokenDispatch({ type: "TRANSFER_SUCCESS" })
    } catch (e) {
      tokenDispatch({ type: "TX_FAILURE", payload: e })
    }
  }

  return (
    <>
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="2.5rem"
        as="h2"
      >
        Interact with FarahToken (ERC20)
      </Text>
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="1.5rem"
        as="h3"
        mb="1rem"
      >
        Send tokens
      </Text>
      <Flex>
        <InputGroup justifyContent={{ base: "center", xl: "start" }}>
          <Input
            value={amountToSend}
            onChange={(e) =>
              tokenDispatch({ type: "AMOUNT_TO_SEND", payload: e.target.value })
            }
            type="number"
            maxW="10%"
            bg="white"
          />
          <InputRightAddon borderEndRadius="0" children="to:" />
          <Input
            value={address}
            onChange={(e) =>
              tokenDispatch({ type: "CHANGE_ADDRESS", payload: e.target.value })
            }
            borderStart="none"
            borderStartRadius="0"
            maxW="40%"
            borderEndRadius="0"
            type="text"
            bg="white"
            placeholder="0x0000...000"
          />
          <Button onClick={handleSendToken} borderStartRadius="0">
            Send
          </Button>
        </InputGroup>
      </Flex>
      <p>
        {amountToSend} {address}
      </p>
    </>
  )
}

export default ERC20
