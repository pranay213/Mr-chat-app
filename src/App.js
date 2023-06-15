import { MainContextProvider } from "./Context";
import ProdRoutes from "./ProdRoutes";

function App() {
  return (
    <MainContextProvider>
      <ProdRoutes />
    </MainContextProvider>
  );
}

export default App;
