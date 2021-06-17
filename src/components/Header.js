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
      <Container minH="15vh" minW="90%" bg="gray">
        <Flex>
          <Text
            my="auto"
            fontFamily="cursive"
            textAlign="center"
            fontSize="4rem"
            as="h1"
          >
            FarahToken Faucet Dapp
          </Text>
          <Spacer />
          <Box>
            {!web3State.isMetaMask ? (
              <Text as="p">Install Metamask to use the app</Text>
            ) : web3State.isLogged ? (
              <>
                <Text as="p">Address: {web3State.account}</Text>
                <Text>Network: {web3State.networkName}</Text>
                <Text>Balance: {web3State.balance}</Text>
                <Text>Balance of FRT: {web3State.balance}</Text>
                <Button>Refresh</Button>
              </>
            ) : (
              <Button onClick={login}>Login</Button>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  )
}

export default Header
