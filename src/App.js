import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import NotFound from "./Routes/NotFound";
import CoinInfo from "./Routes/CoinInfo";
import { ContextProvider } from "./store/context";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="bg-gradient-to-r from-[#F4D03F] to-[#16A085]  min-h-screen bg-fixed py-10 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coin/:coinId" element={<CoinInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
