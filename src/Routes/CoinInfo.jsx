import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CoinInfo = () => {
  const { coinId } = useParams();
  const [isLoading, error, sendRequest] = useHttp();
  const [data, setData] = useState({});

  const RenderLineChart = ({ priceData }) => {
    return (
      <LineChart
        width={1200}
        height={400}
        data={priceData}
        margin={{ left: 5 }}
        style={{ fontSize: "1.5rem" }}
      >
        <CartesianGrid stroke="white" strokeDasharray="10 10" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          wrapperStyle={{
            fontSize: "1.8rem",
            fontWeight: "bold",
          }}
        />

        <Line
          type="scatter"
          dataKey="percentage"
          dot={{ stroke: "black", strokeWidth: 4 }}
          stroke="black"
          activeDot={{ r: 10 }}
        />
      </LineChart>
    );
  };

  const handleData = (data) => {
    console.log(data);
    setData(data);
  };
  useEffect(() => {
    sendRequest(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      handleData
    );
  }, [sendRequest, coinId]);

  return (
    <div className="max-w-[130rem] bg-[rgba(255,255,255,.4)] text-white backdrop-blur-md backdrop-opacity-40 my-0 mx-auto py-2 px-4 flex flex-col gap-3">
      {!isLoading && (
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-black text-[3.2rem]">{data.name}</h1>
            <figure className="w-[4.8rem]">
              <img src={data.image.large} alt={data.name} />
            </figure>
          </div>
          <h2 className="text-black text-[1.8rem] mb-3">
            Percentage exchange of {data.name}
          </h2>
          <RenderLineChart
            priceData={[
              {
                name: "1h",
                percentage: Math.ceil(
                  data.market_data.price_change_percentage_1h_in_currency.usd
                ),
              },
              {
                name: "24h",
                percentage: Math.ceil(
                  data.market_data.price_change_percentage_24h
                ),
              },
              {
                name: "7d",
                percentage: Math.ceil(
                  data.market_data.price_change_percentage_7d
                ),
              },
              {
                name: "30d",
                percentage: Math.ceil(
                  data.market_data.price_change_percentage_30d
                ),
              },
              {
                name: "1y",
                percentage: Math.ceil(
                  data.market_data.price_change_percentage_1y
                ),
              },
            ]}
          />
          <div className="w-full flex flex-col items-center justify-between gap-6">
            <div className="w-full text-black text-[1.8rem] flex-initial basis-1/2 flex items-center justify-between gap-4">
              <p>Market Value: {data.market_data.current_price.usd}$</p>
              <p>24h The Highest:{data.market_data.high_24h.usd}$</p>
              <p>24h The Lowest :{data.market_data.low_24h.usd}$</p>
            </div>
            <h3 className="text-black text-[3.2rem]">About {data.name}</h3>
            <p
              dangerouslySetInnerHTML={{ __html: data.description.en }}
              className="text-black text-2xl  leading-10"
            ></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinInfo;
