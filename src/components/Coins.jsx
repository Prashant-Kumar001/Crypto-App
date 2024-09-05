import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "./Error";

const CoinsComponent = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/exchanges"
        );
        setCoins(response.data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    // Call the fetch function
    fetchCoins();
  }, []); // Empty dependency array means this runs once on mount

 
  if (error) {
    return <Error message={error} />
  }

  if (loading) {
    return (
      <div className="w-full min-h-[89vh] flex flex-col justify-center items-center">
        <div className="loader"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap gap-5 justify-center">
        {coins.map((coin, index) => (
          <div
            className="shadow-lg max-w-[10rem] w-full md:max-w-[13rem] flex flex-col justify-center items-center rounded-md p-4 transition-transform transform hover:scale-105 cursor-pointer"
            key={index}
          >
            <a href={coin.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
              <img className="w-[3rem] h-[3rem] object-cover" src={coin.image} alt={coin.name} />
              <p className="mt-2 text-center">
                <span className="font-bold">{coin.id.slice(0, 10)}</span>
              </p>
              <p className="mt-1 text-center">
                <span className="font-bold">{coin.trust_score_rank}</span>
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoinsComponent;

