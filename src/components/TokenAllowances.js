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
  const { address, allowance } = tokenState

  const handleCheckAllowance = async () => {
    try {
      let allowance = await farahtoken.allowance(address)
      tokenDispatch({
        type: "GET_ALLOWANCE",
        payload: ethers.utils.formatEther(allowance.toString()),
      })
    } catch (e) {
      console.log(e)
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
      <InputGroup justifyContent={{ base: "center", xl: "start" }}>
        <InputLeftAddon children="address:" />
        <Input
          value={address}
          borderStart="none"
          borderStartRadius="0"
          maxW="20%"
          borderEndRadius="0"
          type="text"
          bg="white"
          placeholder="0x0000...000"
        />
        <Button onClick={handleCheckAllowance} borderStartRadius="0">
          Check
        </Button>
      </InputGroup>
      <Text>{allowance}</Text>
      {/* APPROVE UP DOWN TOTAL SUPLLY */}
    </>
  )
}

export default TokenAllowances
