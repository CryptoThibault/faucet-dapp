import { Box, Text, Link } from "@chakra-ui/react"
import { useFarahToken } from "../hooks/useFarahToken"
import History from "./History"
import SendTokens from "./SendTokens"
import TokenAllowances from "./TokenAllowances"

const ERC20 = () => {
  const [farahtoken, tokenState] = useFarahToken()
  const { tokenName, symbol, decimals } = tokenState

  return (
    <>
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="2.5rem"
        as="h2"
      >
        Interact with {tokenName} ({symbol})
      </Text>
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="1.5rem"
        as="h3"
        mb="1rem"
      >
        Token informations
      </Text>
      <Box
        mb="1rem"
        fontSize="1.2rem"
        textAlign={{ base: "center", xl: "start" }}
      >
        <Text>
          Contracts address:{" "}
          <Link
            isExternal
            href={`https://etherscan.io/address/${farahtoken.address}`}
          >
            {farahtoken.address}
          </Link>
        </Text>
        <Text>Decimals: {decimals}</Text>
      </Box>
      <History />
      <SendTokens />
      <TokenAllowances />
    </>
  )
}

export default ERC20
