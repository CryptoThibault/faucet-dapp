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

const SendTokens = () => {
  const [farahtoken, tokenState, tokenDispatch] = useFarahToken()
  const { address, amountToSend, txStatus, fromTransfer, fromAddress } =
    tokenState

  const handleSendToken = async () => {
    tokenDispatch({ type: "TX_WAITING" })
    try {
      let tx
      if (fromTransfer) {
        tx = await farahtoken.transferFrom(
          fromAddress,
          address,
          ethers.utils.parseEther(amountToSend.toString())
        )
      } else {
        tx = await farahtoken.transfer(
          address,
          ethers.utils.parseEther(amountToSend.toString())
        )
      }
      tokenDispatch({ type: "TX_PENDING" })
      await tx.wait()
      tokenDispatch({ type: "TRANSFER_SUCCESS" })
    } catch (e) {
      console.log(e)
      tokenDispatch({ type: "TX_FAILURE", payload: e })
    }
  }
  const handleChangeFrom = () => {
    tokenDispatch({ type: "SET_TRANSFER_FROM" })
  }

  return (
    <>
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="1.5rem"
        as="h3"
        mb="1rem"
      >
        Send tokens
      </Text>
      <Flex flexDirection={{ base: "column", xl: "row" }} mb="1rem">
        <FormControl
          maxW={{ base: "50%", xl: "20%" }}
          mx={{ base: "auto", xl: "0" }}
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", xl: "start" }}
          mb="1rem"
        >
          <Switch onChange={handleChangeFrom} me="0.75rem" id="transfer-from" />
          <FormLabel my="auto" fontSize="1.2rem" htmlFor="transfer-from">
            Transfer From
          </FormLabel>
        </FormControl>
        {fromTransfer ? (
          <InputGroup justifyContent={{ base: "center", xl: "start" }}>
            <InputLeftAddon children="from:" />
            <Input
              value={fromAddress}
              onChange={(e) =>
                tokenDispatch({
                  type: "CHANGE_FROM_ADDRESS",
                  payload: e.target.value,
                })
              }
              borderStart="none"
              borderStartRadius="0"
              maxW="20%"
              borderEndRadius="0"
              type="text"
              bg="white"
              placeholder="0x0000...000"
            />
          </InputGroup>
        ) : (
          <></>
        )}
      </Flex>
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
            mb="1rem"
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
          <Button
            loadingText={txStatus}
            isLoading={
              txStatus.startsWith("Waiting") || txStatus.startsWith("Pending")
            }
            onClick={handleSendToken}
            borderStartRadius="0"
          >
            Send
          </Button>
        </InputGroup>
      </Flex>
      {txStatus.startsWith("Failed") ? (
        <Alert status="error">
          <AlertIcon />
          {txStatus}
        </Alert>
      ) : (
        ""
      )}
    </>
  )
}

export default SendTokens
