import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import CoinContext from "../../store/context";

const SearchCrypto = () => {
  const coinCtx = useContext(CoinContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, error, sendRequest] = useHttp();
  const inputRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchHandler = (e) => {
    e.preventDefault();
    if (inputRef.current.value.length === 0) return;
    setSearchQuery(inputRef.current.value);
    setSearchParams({ search: inputRef.current.value });

    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleSearchQuery = useCallback((data) => {
    console.log(data);
    coinCtx.getSearchList(data.coins);
  }, []);

  useEffect(() => {
    if (!searchParams.get("search")) return coinCtx.setIsSearched(false);
    setSearchQuery(searchParams.get("search"));
    inputRef.current.value = searchParams.get("search");
    if (searchQuery.length > 0) {
      sendRequest(
        `https://api.coingecko.com/api/v3/search?query=${searchQuery}`,
        handleSearchQuery
      );
    }
  }, [sendRequest, searchQuery, handleSearchQuery, searchParams]);

  return (
    <form onSubmit={searchHandler}>
      <div className="flex items-center justify-center gap-3">
        <input
          ref={inputRef}
          className="py-2 px-4 border-none outline-none text-[1.8rem] rounded-md"
          type="text"
          placeholder="Search your crypto"
        />
        <button className="bg-white text-[1.8rem] py-2 px-4 rounded-md">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchCrypto;
