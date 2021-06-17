import { useFaucet } from "../hooks/useFaucet";
import {
  Text,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";
import { useFarahToken } from "../hooks/useFarahToken";

const Faucet = () => {
  const [web3State] = useContext(Web3Context);
  const [faucet, faucetState, faucetDispatch] = useFaucet();
  const {
    remainingSupply,
    timeRemaining,
    ownerAddress,
    erc20Address,
    amountReceived,
    donation,
  } = faucetState;

  const [, tokenState] = useFarahToken();
  const { tokenName, symbol } = tokenState;

  useEffect(() => {
    const initialState = async () => {
      const txA = await faucet.remainingSupply();
      const txB = await faucet.timeRemainingOf(web3State.account);
      const txC = await faucet.amountReceived();
      faucetDispatch({
        type: "FAUCET_INFO",
        payload: {
          a: ethers.utils.formatEther(txA.toString()),
          b: txB.toString(),
          c: await faucet.tokenOwner(),
          d: await faucet.tokenContractAddress(),
          e: ethers.utils.formatEther(txC.toString()),
        },
      });
    };
    if (faucet) {
      initialState();
    }
  }, [faucet, web3State.account, faucetDispatch]);

  useEffect(() => {
    const changeTime = async () => {
      const tx = await faucet.timeRemainingOf(web3State.account);
      faucetDispatch({ type: "GET_TIME", payload: tx.toString() });
    };
    if (faucet && web3State) {
      changeTime();
    }
  }, [faucet, web3State, faucetDispatch]);

  const handleClickToken = async () => {
    const tx = await faucet.getToken();
    await tx.wait();
    const txA = await faucet.remainingSupply();
    const txB = await faucet.timeRemainingOf(web3State.account);
    faucetDispatch({
      type: "GET_TOKEN",
      payload: {
        a: txA.toString(),
        b: txB.toString(),
      },
    });
  };

  const handleChangeDonation = (e) => {
    faucetDispatch({ type: "CHANGE_DONATION", payload: e.target.value });
  };
  const handleClickDonate = async () => {
    const weiAmount = ethers.utils.parseEther(donation);
    try {
      const tx = await web3State.signer.sendTransaction({
        to: ownerAddress,
        value: weiAmount,
      });
      await tx.wait();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box bgGradient="linear(to-t, blue.500, gray.50)" rounded="xl" p={3}>
        <Text
          textAlign={{ base: "center", xl: "start" }}
          fontSize="1.5rem"
          as="h2"
          mb={5}
        >
          {tokenName} Faucet
        </Text>
        <Flex>
          <Text ms={10} as="p">
            This faucet have {remainingSupply} {tokenName} remaining,
            {Number(timeRemaining)
              ? ` you will be able to get more ${symbol} in ${timeRemaining} secondes.`
              : ` press the button to get ${amountReceived} ${symbol}.`}
          </Text>
        </Flex>
        <Box textAlign="center" my={10}>
          <Button onClick={handleClickToken} disabled={timeRemaining !== "0"}>
            Get {amountReceived} {symbol}
          </Button>
        </Box>
        <Text
          textAlign={{ base: "center", xl: "start" }}
          fontSize="1.2rem"
          as="h4"
          mb={2}
          me={10}
        >
          Faucet infos
        </Text>
        <Flex>
          <Text m={5}>Faucet Creator: {ownerAddress}</Text>
          <InputGroup m={5}>
            <Input
              bg="white"
              type="text"
              value={donation}
              onChange={handleChangeDonation}
            />
            <InputRightAddon borderEndRadius="0" children="ETH" />
            <Button px={5} borderStartRadius="0" onClick={handleClickDonate}>
              Donate
            </Button>
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
};

export default Faucet;
