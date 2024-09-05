import React, { useState } from "react";
import Loader from "./Loader";
import img1 from "../assets/btc.png"; // Ensure the path is correct
const Home = () => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="max-w-[800px] mx-auto">
      {loading && <Loader />}
      <img 
        src={img1} // Use the imported image variable
        alt="Bitcoin logo" 
        onLoad={handleImageLoad} 
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        className="md:max-w-[680px] w-full up-down object-cover mx-auto" // Adjust styles as needed
      />
    </div>
  );
};

export default Home;
