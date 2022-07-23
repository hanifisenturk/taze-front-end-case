import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./store/context";

const HomePage = lazy(() => import("./Routes/Home"));
const CoinInfoPage = lazy(() => import("./Routes/CoinInfo"));
const NotFoundPage = lazy(() => import("./Routes/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Suspense fallback={<div>LOADING...</div>}>
          <div className="bg-gradient-to-r from-[#F4D03F] to-[#16A085]  min-h-screen bg-fixed py-10 px-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/coin/:coinId" element={<CoinInfoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Suspense>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
