import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import CoinContext from "../../store/context";
import useHttp from "../../hooks/useHttp";

const WatchList = () => {
  const [watched, setWatched] = useState([]);
  const coinCtx = useContext(CoinContext);

  const [isLoading, error, sendRequest] = useHttp();

  const watchListHandler = (data) => {
    setWatched(data);
    console.log(data);
  };

  const RenderLineChart = ({ priceData }) => {
    return (
      <LineChart width={200} height={100} data={priceData} margin={{ left: 5 }}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="percentage"
          stroke="#9509F6"
          activeDot={{ r: 4 }}
        />
      </LineChart>
    );
  };

  useEffect(() => {
    sendRequest(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinCtx.coinList}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d`,
      watchListHandler
    );
    console.log("fdf");
  }, [sendRequest, coinCtx.coinList]);

  if (coinCtx.coinList && coinCtx.coinList.length > 0) {
    return (
      <div className="max-w-[130rem] my-0 mx-auto mb-10">
        <h1 className="text-[2.4rem] text-white mb-3">Watch List</h1>
        <table className="border-collapse text-center table-fixed w-full bg-[rgba(255,255,255,.4)] text-white backdrop-blur-md backdrop-opacity-40">
          <thead className="text-[1.8rem] select-none ">
            <tr>
              <th className="border-b-2 border-black">Logo</th>
              <th className="border-b-2 border-black">Name</th>
              <th className="border-b-2 border-black">Current Price (USD)</th>
              <th className="border-b-2 border-black">Volume(24h)%</th>
              <th className="border-b-2 border-black">Exchange Graphic </th>
            </tr>
          </thead>
          <tbody className="text-[1.8rem]">
            {watched.map((data) => {
              return (
                <tr key={data.id}>
                  <td className="border-b-2 border-black my-0 py-1 pb-2 ">
                    <Link to={`${data.id}`}>
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
                    {data.market_cap_change_percentage_24h}%
                  </td>
                  <td className="border-b-2 border-black py-3">
                    {
                      <RenderLineChart
                        priceData={[
                          {
                            name: "1h",
                            percentage: Math.ceil(
                              data.price_change_percentage_1h_in_currency
                            ),
                          },
                          {
                            name: "24h",
                            percentage: Math.ceil(
                              data.price_change_percentage_24h_in_currency
                            ),
                          },
                          {
                            name: "7d",
                            percentage: Math.ceil(
                              data.price_change_percentage_7d_in_currency
                            ),
                          },
                          {
                            name: "30d",
                            percentage: Math.ceil(
                              data.price_change_percentage_30d_in_currency
                            ),
                          },
                        ]}
                      />
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default WatchList;
