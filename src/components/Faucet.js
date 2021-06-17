import { useFaucet } from "../hooks/useFaucet";
import { Text, Box, Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { ethers } from "ethers";

const Faucet = () => {
  const [faucet, faucetState, faucetDispatch] = useFaucet();
  const [web3State] = useContext(Web3Context);
  const {
    remainingSupply,
    timeRemaining,
    ownerAddress,
    erc20Address,
    amountReceived,
  } = faucetState;

  useEffect(() => {
    const initialState = async () => {
      const txA = await faucet.remainingSupply();
      const txB = await faucet.timeRemainingOf(web3State.account);
      console.log(txB.toString());
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

  const handleClickToken = async () => {
    const tx = await faucet.getToken();
    await tx.wait();
    faucetDispatch({
      type: "GET_TOKEN",
      payload: {
        a: await faucet.remainingSupply().toString(),
        b: await faucet.timeRemainingOf(web3State.account).toString(),
      },
    });
  };
  const handleClickTime = async () => {
    const tx = await faucet.timeRemainingOf(web3State.account);
    faucetDispatch({
      type: "GET_TIME",
      payload: tx.toString(),
    });
  };

  return (
    <>
      <Box bg="blue.200">
        <Text>Remaining supply: {remainingSupply}</Text>
        <Text>Time Remaing: {timeRemaining}</Text>
        <Text>Owner Address: {ownerAddress}</Text>
        <Text>ERC20 Address: {erc20Address}</Text>
        <Text>Amount Received: {amountReceived}</Text>
        <Button onClick={handleClickToken} disabled={timeRemaining !== 0}>
          Get {amountReceived} Token
        </Button>
        <Button onClick={handleClickTime}>Get Time</Button>
      </Box>
    </>
  );
};

export default Faucet;
