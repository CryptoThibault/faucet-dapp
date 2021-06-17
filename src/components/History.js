import {
  Button,
  Box,
  useDisclosure,
  Drawer,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react"
import { useRef } from "react"
import { useFarahToken } from "../hooks/useFarahToken"

const History = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const [, tokenState] = useFarahToken()
  const { txList } = tokenState

  return (
    <>
      {" "}
      <Button onClick={onOpen}>See your transaction history</Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Transactions history</DrawerHeader>
          <DrawerBody>
            {txList.map((elem) => {
              return (
                <Box>
                  <Text>From: {elem[0]}</Text>
                  <Text>To: {elem[1]}</Text>
                  <Text>Ammount: {elem[2].toString()}</Text>
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
