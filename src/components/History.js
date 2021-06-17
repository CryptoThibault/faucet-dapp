import {
  Button,
  Box,
  Flex,
  useDisclosure,
  Drawer,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react"
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons"
import { useRef } from "react"
import { useFarahToken } from "../hooks/useFarahToken"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import { ethers } from "ethers"

const History = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const [web3state] = useContext(Web3Context)
  const [, tokenState] = useFarahToken()
  const { txList } = tokenState

  return (
    <>
      <Button
        mb="2rem"
        display="flex"
        mx={{ base: "auto", xl: "0" }}
        onClick={onOpen}
      >
        See your transaction history
      </Button>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Transactions history</DrawerHeader>
          <DrawerBody>
            {txList.map((elem) => {
              return (
                <Box
                  rounded="base"
                  p="0.50rem"
                  mb="0.5rem"
                  bg={
                    elem.from.toLowerCase() === web3state.account.toLowerCase()
                      ? "lightcoral"
                      : "lightseagreen"
                  }
                >
                  <Flex>
                    {elem.from.toLowerCase() ===
                    web3state.account.toLowerCase() ? (
                      <ArrowBackIcon
                        color="red.800"
                        fontSize="2rem"
                        me="1rem"
                        my="auto"
                      />
                    ) : (
                      <ArrowForwardIcon
                        color="green.800"
                        fontSize="2rem"
                        me="1rem"
                        my="auto"
                      />
                    )}
                    <Flex flexDirection="column">
                      {elem.from.toLowerCase() ===
                      web3state.account.toLowerCase() ? (
                        <Text maxW="sm" isTruncated fontSize="1.25rem">
                          {elem.to}
                        </Text>
                      ) : (
                        <Text maxW="sm" isTruncated fontSize="1.25rem">
                          {elem.from}
                        </Text>
                      )}
                      <Text fontWeight="bold" fontSize="1.5rem">
                        Amount:
                        {ethers.utils.formatEther(elem.amount.toString())} FRT
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              )
            })}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default History
