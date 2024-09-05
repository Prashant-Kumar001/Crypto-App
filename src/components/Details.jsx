import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCountry } from "../context/country/CountryContext";
import { NavLink, useParams } from "react-router-dom";
import Error from "./Error";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Loader from "./Loader";
import { useToggle} from '../context/toggle/ToggleContext'

const Details = () => {
  const { isToggled } = useToggle();
  const [coins, setCoins] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { country } = useCountry();
  const { id } = useParams();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/`
        );
        setCoins(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [id]);

  const code = country === "inr" ? "₹" : country === "eur" ? "€" : "$";

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error} />;
  }
  const fontColor = `${isToggled ? '#fff' : 'black'}`

  const currentPrice = coins.market_data?.current_price[country] || "N/A";

  // Price change percentages
  const priceChangePercentages = {
    "1h": coins.market_data?.price_change_percentage_1h_in_currency[country] || 0,
    "24h": coins.market_data?.price_change_percentage_24h || 0,
    "7d": coins.market_data?.price_change_percentage_7d || 0,
    "30d": coins.market_data?.price_change_percentage_30d || 0,
    "60d": coins.market_data?.price_change_percentage_60d || 0,
    "200d": coins.market_data?.price_change_percentage_200d || 0,
    "1y": coins.market_data?.price_change_percentage_1y || 0,
  };

  const getBarColor = (percentage) => {
    if (percentage > 0) return "text-green-500";
    if (percentage < 0) return "text-red-500";
    return "bg-gray-300";
  };

  const getProgressBarWidth = (percentage) =>
    Math.min(100, Math.max(0, percentage));

  return (
    <div className="details-container px-2 md:p-8 w-full md:max-w-4xl mx-auto  shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{coins.name}</h1>
      <img
        src={coins.image?.small}
        alt={coins.name}
        className="w-32 h-32 mb-6 mx-auto rounded-full border-2 border-gray-300 shadow-md"
      />
      <div className="details-info text-center">
        <h2 className="text-2xl font-semibold mb-2">
          {code} {currentPrice}
        </h2>
        <h3 className="text-lg mb-2">
          Market Cap: {coins.market_data?.market_cap?.usd.toLocaleString()}
        </h3>
        <h3 className="text-lg mb-2">
          Total Supply: {coins.market_data?.total_supply?.toLocaleString()}
        </h3>
        <h3 className="text-lg mb-2">
          Rank: #{coins.market_data?.market_cap_rank}
        </h3>
        <h3 className="text-lg mb-4">
          Last Updated: {new Date(coins.last_updated).toLocaleString()}
        </h3>
        <h3 className="text-lg mb-4">Country: {country}</h3>
        <h3 className="bg-gray-800 text-white inline-block px-4 py-2 rounded-full mb-4">
          #{coins.market_data?.market_cap_rank}
        </h3>
        <h3 className={`flex items-center justify-center mb-4`}>
          <MdOutlineArrowDropDown
            className={`text-2xl ${getBarColor(priceChangePercentages["24h"])}`}
          />
          24h {priceChangePercentages["24h"].toFixed(2)}%
        </h3>
        <div>
          <div className="flex flex-col gap-3 mb-6 mt-3">
            <h4 className="text-xl font-semibold mb-4">Price Range</h4>
            <div className="flex justify-between ">
              <h1>
                <span className="bg-red-400 text-white rounded-md p-1">
                  {code}
                  {coins.market_data.low_24h[country]}
                </span>{" "}
              </h1>
              <h1>
                <span className="bg-orange-400 text-white rounded-md p-1">
                  {code}
                  {coins.market_data.current_price[country]}
                </span>{" "}
              </h1>
              <h1>
                <span className="bg-green-400 text-white rounded-md p-1">
                  {code}
                  {coins.market_data.high_24h[country]}
                </span>{" "}
              </h1>
            </div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold uppercase underline mb-6">
                Supply Chart
              </h1>
              <div className="w-full">
                <div className="flex justify-between">
                  <h2 className="roboto font-semibold w-40 text-left">Max Supply:</h2>
                  <span className={`${fontColor}`}>
                    {coins.market_data.max_supply}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2 className="roboto font-semibold w-40 text-left">
                    Circulating Supply:
                  </h2>
                  <span className={`${fontColor}`}>
                    {coins.market_data.circulating_supply}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2 className="roboto font-semibold w-40 text-left">Total Supply:</h2>
                  <span className={`${fontColor}`}>
                    {coins.market_data.total_supply}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2 className="roboto font-semibold w-40 text-left">Market Cap:</h2>
                  <span className={`${fontColor}`}>
                    {coins.market_data.market_cap[country]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2 className="roboto font-semibold w-40 text-left">
                    All Time Market Cap:
                  </h2>
                  <span className={`${fontColor}`}>
                    {coins.market_data.atl[country]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h2 className="roboto font-semibold w-40 text-left">
                    All Time High Cap:
                  </h2>
                  <span className={`${fontColor}`}>
                    {coins.market_data.ath[country]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Price Change Over Time</h4>
          <div className="flex flex-col justify-center m-auto gap-5 w-full ">
            {Object.entries(priceChangePercentages).map(
              ([timeframe, percentage]) => (
                <div
                  key={timeframe}
                  className="flex items-center gap-4 w-full md:max-w-[70vw]"
                >
                  <span className="inline-block w-14 mr-4">{percentage}</span>
                  <div className="w-full bg-gray-200 border-2 border-gray-300 rounded-full h-4 relative">
                    <div
                      className={`h-full rounded-full bg-green-500`}
                      style={{ width: `${getProgressBarWidth(percentage)}%` }}
                    ></div>
                  </div>
                  <span className="inline-block w-14">{timeframe}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <NavLink
        to="/Exchanges"
        className="back-link inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
      >
        Back
      </NavLink>
    </div>
  );
};

export default Details;
