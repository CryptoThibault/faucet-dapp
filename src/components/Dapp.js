import ERC20 from "./ERC20"
import Faucet from "./Faucet"
import Header from "./Header"
import { useFarahToken } from "../hooks/useFarahToken"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import { Box, Alert, AlertIcon, Button, Container } from "@chakra-ui/react"

const Dapp = () => {
  const [farahtoken] = useFarahToken()
  const [web3State] = useContext(Web3Context)

  function debug() {
    console.log(web3State.chainId)
  }

  return (
    <>
      <Box minH="100vh" bgGradient="linear(-45deg,#FFFFFF,#DDEEAA)">
        <Header />

        <Container minW="90%">
          {/* ERC20 */}
          <Button onClick={debug}>Console.log (debug)</Button>
          {!web3State.chainId === 4 ? (
            <Alert status="warning">
              <AlertIcon />
              FarahToken is deployed on the Rinkeby network
            </Alert>
          ) : farahtoken ? (
            <ERC20 />
          ) : (
            <Alert status="error">
              <AlertIcon />
              Le contrat n'est pas initialiser
            </Alert>
          )}

          <Faucet />
        </Container>
      </Box>
    </>
  )
}

export default Dapp
