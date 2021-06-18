import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import { Text, Box, Flex, Spacer, Container, Button } from "@chakra-ui/react"
import { useFarahToken } from "../hooks/useFarahToken"

const Header = () => {
  const [web3State, login] = useContext(Web3Context)
  const [, tokenState] = useFarahToken()
  const { myBalance } = tokenState

  const networkStyle = (network) => {
    switch (network) {
      case "Mainnet":
        return "#29B6AF"
      case "Rinkeby":
        return "#F6C343"
      case "Ropsten":
        return "#FF4A8D"
      case "Kovan":
        return "#9064FF"
      case "Goerli":
        return "#3099F2"
      default:
        return "#000000"
    }
  }

  return (
    <>
      <Box bg="blackAlpha.400">
        <Container minH="15vh" minW="90%">
          <Flex flexDirection={{ base: "column", xl: "row" }}>
            <Text
              py="2rem"
              my="auto"
              fontFamily="cursive"
              textAlign={{ base: "center", xl: "start" }}
              fontSize="4rem"
              as="h1"
            >
              FarahToken Faucet Dapp
            </Text>
            <Spacer />
            <Flex
              py="2rem"
              justifyContent={{ base: "center", xl: "space-between" }}
              alignItems="center"
            >
              {!web3State.isMetaMask ? (
                <Text as="p">Install Metamask to use the app</Text>
              ) : web3State.isLogged ? (
                <Flex fontSize="1.1rem" flexDirection="column">
                  <Flex flexDirection="row">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="ethereum"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                      className=" fa-ethereum fa-w-1 me-3"
                      width="1.5rem"
                    >
                      <path
                        fill={networkStyle(web3State.networkName)}
                        d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                      ></path>
                    </svg>
                    <Text fontSize="1.3rem" my="auto" ms="1rem">
                      Address: {web3State.account}
                    </Text>
                  </Flex>
                  <Flex
                    justifyContent="space-between"
                    flexDirection="row"
                    mt="2rem"
                  >
                    <Text>
                      <b>Network:</b> {web3State.networkName}
                    </Text>
                    <Text>
                      <b>Balance:</b> {web3State.balance} ETH
                    </Text>
                    <Text>
                      <b>Balance of FRT:</b> {myBalance}
                    </Text>
                  </Flex>
                </Flex>
              ) : (
                <Button onClick={login}>Login</Button>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Header
