import { BoardContextProvider } from "./context/BoardContext";
import Wrapper from "./components/Wrapper";

function App() {
  return (
    <BoardContextProvider>
      <Wrapper />
    </BoardContextProvider>
  )
}

export default App
