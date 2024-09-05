import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import NotFound from "./components/NotFound";
import Details from "./components/Details";
import Footer from "./components/Footer";
const App = () => {
  return (
    <BrowserRouter>
      <div className="w-full md:max-w-[80vw] m-auto" >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Coins" element={<Coins />} />
          <Route path="/Exchanges" element={<Exchanges />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
