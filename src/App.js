import { ContextProvider } from "./store/context";
import CryptoList from "./Components/CryptoList/CryptoList";
import WatchList from "./Components/WatchList/WatchList";

function App() {
  return (
    <ContextProvider>
      <div className="bg-gradient-to-r from-[#23074d] to-[#cc5333]  min-h-screen bg-fixed py-10">
        <WatchList />
        <CryptoList />
      </div>
    </ContextProvider>
  );
}

export default App;
