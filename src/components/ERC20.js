import {
  Box,
  Text,
  Button,
  Flex,
  InputGroup,
  Input,
  InputRightAddon,
  InputLeftAddon,
  Alert,
  AlertIcon,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useFarahToken } from "../hooks/useFarahToken";
import History from "./History";

const ERC20 = () => {
  const [farahtoken, tokenState, tokenDispatch] = useFarahToken();
  const {
    tokenName,
    symbol,
    decimals,
    address,
    amountToSend,
    txStatus,
    fromTransfer,
    fromAddress,
  } = tokenState;

  const handleSendToken = async () => {
    tokenDispatch({ type: "TX_WAITING" });
    try {
      let tx = await farahtoken.transfer(
        address,
        ethers.utils.parseEther(amountToSend.toString())
      );
      tokenDispatch({ type: "TX_PENDING" });
      await tx.wait();
      tokenDispatch({ type: "TRANSFER_SUCCESS" });
    } catch (e) {
      console.log(e);
      tokenDispatch({ type: "TX_FAILURE", payload: e });
    }
  };

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
      <Text
        textAlign={{ base: "center", xl: "start" }}
        fontSize="1.5rem"
        as="h3"
        mb="1rem"
      >
        Send tokens
      </Text>
      <Flex mb="1rem">
        <Checkbox size="lg" minW="10%">
          Transfer From
        </Checkbox>
        <InputGroup>
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
  );
};

export default ERC20;
