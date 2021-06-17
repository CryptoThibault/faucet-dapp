import { useFaucet } from "../hooks/useFaucet";
import { Text, Box, Button } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";

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
      faucetDispatch({
        type: "GET_TOKEN",
        payload: {
          a: await faucet.remainingSupply().toString(),
          b: await faucet.timeRemainingOf(web3State.account).toString(),
        },
      });
      faucetDispatch({
        type: "GET_CONTRACT",
        payload: {
          a: await faucet.tokenOwner(),
          b: await faucet.tokenContractAddress(),
          c: await faucet.amountReceived().toString(),
        },
      });
    };
    initialState();
  }, [faucet, web3State]);

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
    faucetDispatch({
      type: "GET_TIME",
      payload: await faucet.timeRemainingOf(web3State.account).toString(),
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
        <Button onClick={handleClickToken}>Get Token</Button>
        <Button onClick={handleClickTime}>Get Time</Button>
      </Box>
    </>
  );
};

export default Faucet;
