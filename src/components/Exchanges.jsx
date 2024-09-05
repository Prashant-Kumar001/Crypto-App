import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToggle } from "../context/toggle/ToggleContext";
import { useCountry } from "../context/country/CountryContext";
import { NavLink } from "react-router-dom";
import Error from "./Error";

const Exchanges = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const { country } = useCountry();
  const { isToggled } = useToggle();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${country}&page=${page}&per_page=100`
        );
        setCoins(response.data);
        setTotalPages(10); // Example placeholder, replace with actual total pages if available
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, [page, country]);

  if (error) {
   return <Error message={error} />
  }

  return (
    <div className={`min-h-[85vh] ${isToggled ? "" : ""} p-4`}>
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[88vh]">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-5 justify-center mt-4">
            {coins.map((coin) => (
              <div
                className="shadow-lg w-full max-w-[10rem] flex flex-col justify-center items-center rounded-lg p-4  hover:shadow-xl transition-shadow duration-300"
                key={coin.id}
              >
                <NavLink to={`/details/${coin.id}`}>
                  <img
                    className="w-16 h-16 object-cover"
                    src={coin.image}
                    alt={coin.name}
                  />
                </NavLink>
                <h2 className="text-[18px] font-bold mt-2">{coin.symbol}</h2>
                <p className="mt-2 text-center">
                  <span className={`font-bold text-lg`}>
                    {coin.id.slice(0, 10)}
                  </span>
                </p>
                <p className="mt-1 text-center">
                  <span className="font-bold text-blue-500">
                    {coin.trust_score_rank}
                  </span>
                </p>
                <p className="mt-2 text-center">
                  {country === "inr" ? "₹" : country === "eur" ? "€ " : "$"}{" "}
                  {coin.current_price}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
              className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              Prev
            </button>
            <span className="self-center text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={page === totalPages}
              className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Exchanges;
