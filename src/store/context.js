import { createContext, useState, useEffect } from "react";

const CoinContext = createContext({
  coinList: [],
  addToWatchList: () => {},
  removeFromWatchList: () => {},
  currentPage: 1,
  setIsSearched: () => {},
  isSearched: false,
  searchList: [],
  getSearchList: () => {},
  getCurrentPage: (pageNumber) => {},
});

export const ContextProvider = ({ children }) => {
  const [coinList, setCoinList] = useState([]);
  const [currentPage, setCurrentPage] = useState([]);
  const [searchList, setSearchList] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  const getCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSearchList = (list) => {
    setSearchList(list);
    setIsSearched(true);
  };

  useEffect(() => {
    const existedStorage = JSON.parse(localStorage.getItem("watchList"));
    if (existedStorage && existedStorage.length > 0) {
      setCoinList(existedStorage);
    }
  }, []);

  const addToWatchList = (e) => {
    if (coinList.length > 0) {
      const newArr = [e.currentTarget.id, ...coinList];
      setCoinList(newArr);
      localStorage.setItem("watchList", JSON.stringify(newArr));
      console.log(e.currentTarget.id);
      return;
    }

    setCoinList([e.currentTarget.id]);

    localStorage.setItem("watchList", JSON.stringify(e.currentTarget.id));
  };

  const removeFromWatchList = (e) => {
    const newArr = coinList.filter((coin) => coin !== e.currentTarget.id);
    setCoinList(newArr);
    localStorage.setItem("watchList", JSON.stringify(newArr));
  };

  return (
    <CoinContext.Provider
      value={{
        addToWatchList: addToWatchList,
        removeFromWatchList: removeFromWatchList,
        coinList: coinList,
        getCurrentPage: getCurrentPage,
        currentPage: currentPage,
        getSearchList: getSearchList,
        searchList: searchList,
        setIsSearched: setIsSearched,
        isSearched: isSearched,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContext;
