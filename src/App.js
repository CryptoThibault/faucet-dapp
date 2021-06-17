import Dapp from "./components/Dapp"
import ContractsContextProvider from "./contexts/ContractsContext"

const App = () => {
  return (
    <ContractsContextProvider>
      <Dapp />
    </ContractsContextProvider>
  )
}

export default App
