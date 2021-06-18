import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import { Text, Box, Flex, Spacer, Container, Button } from "@chakra-ui/react"

const Header = () => {
  const [web3State, login] = useContext(Web3Context)

  //titre

  // account
  // balance(token) + rafraichir
  // network
  // OU
  // button login

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
                <>
                  <Text>Address: {web3State.account}</Text>
                  <Text>Network: {web3State.networkName}</Text>
                  <Text>Balance: {web3State.balance}</Text>
                  <Text>Balance of FRT: {web3State.balance}</Text>
                </>
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
