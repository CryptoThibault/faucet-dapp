import ERC20 from "./ERC20"
import Faucet from "./Faucet"
import Header from "./Header"
import { useFarahToken } from "../hooks/useFarahToken"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import {
  Box,
  Alert,
  AlertIcon,
  Container,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import { useFaucet } from "../hooks/useFaucet"

const Dapp = () => {
  const [farahtoken] = useFarahToken()
  const [faucet] = useFaucet()
  const [web3State] = useContext(Web3Context)

  return (
    <>
      <Box minH="100vh" bgGradient="linear(45deg, #FFFFFF, #AACCFF)">
        <Header />
        <Container minW="90%">
          <Tabs mt="2rem" variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>ERC20</Tab>
              <Tab>Faucet</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {!(web3State.chainId === 4) ? (
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
              </TabPanel>
              <TabPanel>
                {!(web3State.chainId === 4) ? (
                  <Alert status="warning">
                    <AlertIcon />
                    Faucet is deployed on the Rinkeby network
                  </Alert>
                ) : faucet ? (
                  <Faucet />
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    Le contrat n'est pas initialiser
                  </Alert>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </>
  )
}

export default Dapp
