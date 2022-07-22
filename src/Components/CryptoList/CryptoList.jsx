import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CoinContext from "../../store/context";
import useHttp from "../../hooks/useHttp";
import SearchCrypto from "../SearchCrypto/SearchCrypto";
import Pagination from "../Pagination/Pagination";

const perPage = 100;

const CryptoList = () => {
  const coinCtx = useContext(CoinContext);
  const [datas, SetDatas] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, error, sendRequest] = useHttp();

  const handleData = (data) => {
    SetDatas(data);
  };

  const getTotalCrypto = (data) => {
    console.log(data.length);
    setTotalPage(Math.ceil(data.length / perPage));
  };

  useEffect(() => {
    sendRequest(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${coinCtx.currentPage}&sparkline=false`,
      handleData
    );
    sendRequest(`https://api.coingecko.com/api/v3/coins/list`, getTotalCrypto);
  }, [sendRequest, coinCtx.currentPage]);

  return (
    <div className="max-w-[130rem] my-0 mx-auto">
      <div className="w-full flex items-center justify-between mb-5">
        <SearchCrypto />
        <Pagination totalPage={totalPage} />
      </div>
      <table className="border-collapse text-center table-fixed w-full bg-[rgba(255,255,255,.4)] text-white backdrop-blur-md backdrop-opacity-40">
        <thead className="text-[1.8rem] select-none ">
          <tr>
            <th className="border-b-2 border-black">Logo</th>
            <th className="border-b-2 border-black">Name</th>
            <th className="border-b-2 border-black">Current Price (USD)</th>
            <th className="border-b-2 border-black">Price(24h)%</th>
            <th className="border-b-2 border-black">Volume(24h)%</th>
            <th className="border-b-2 border-black">Watch</th>
          </tr>
        </thead>
        <tbody className="text-[1.8rem]">
          {datas.map((data) => {
            return (
              <tr key={data.id}>
                <td className="border-b-2 border-black my-0 py-1 pb-2 ">
                  <Link to={`coin/${data.id}`}>
                    <figure className="my-0 mx-auto w-[40px] h-[40px]">
                      <img
                        className="object-cover h-full w-full select-none"
                        src={data.image}
                        alt={data.id}
                      />
                    </figure>
                  </Link>
                </td>
                <td className="border-b-2 border-black">{data.name}</td>
                <td className="border-b-2 border-black">
                  {data.current_price}
                </td>
                <td className="border-b-2 border-black">
                  {data.price_change_percentage_24h}%
                </td>
                <td className="border-b-2 border-black">
                  {data.market_cap_change_percentage_24h}%
                </td>
                <td className="border-b-2 border-black ">
                  {coinCtx.coinList.includes(data.id) && (
                    <button
                      id={data.id}
                      onClick={coinCtx.removeFromWatchList}
                      className="px-3 py-3"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                        </svg>
                      </span>
                    </button>
                  )}

                  {!coinCtx.coinList.includes(data.id) && (
                    <button
                      id={data.id}
                      onClick={coinCtx.addToWatchList}
                      className="px-3 py-3"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z" />
                        </svg>
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
