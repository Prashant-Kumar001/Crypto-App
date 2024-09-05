import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCountry } from "../context/country/CountryContext";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import ToggleSwitch from "./ToggleSwitch";
import { useToggle } from "../context/toggle/ToggleContext";
<RxCross2 />;

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { selectCountry } = useCountry();
  const { isToggled, setIsToggled } = useToggle();

  const handleMobileMenuToggle = () => {
    setMobileMenu((prevState) => !prevState);
  };

  const handleSelectCountry = (event) => {
    selectCountry(event.target.value);
  };

  const handleToggleSwitch = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <header className="relative">
      <div className="custom-blur flex sticky top-0 z-50 justify-between items-center shadow-xl px-4 py-2">
        <div>
          <h1>
            logo{" "}
            <span className="text-orange-600 text-3xl font-semibold">
              coins
            </span>
          </h1>
        </div>

        <RiMenu2Line
          onClick={handleMobileMenuToggle}
          className="text-3xl md:hidden cursor-pointer"
          aria-label="Toggle menu"
        />

        <div className="hidden md:block">
          <nav className="flex items-center gap-5">
            <select
              onChange={handleSelectCountry}
              className={`border p-1 rounded ${
                isToggled ? "bg-[#212529]" : "bg-white"
              } `}
            >
              <option value="inr">IND</option>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>

            <ToggleSwitch />

            <ul className="flex gap-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? `${isToggled  ? "text-white" : "text-red-600"}` : "text-black"
                    } uppercase hover:underline font-bold text-[0.9rem]`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
              <NavLink
                  to="/Coins"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? isToggled  ? "text-white" : "text-red-600" : "text-black"
                    } uppercase hover:underline font-bold text-[0.9rem]`
                  }
                >
                  coins
                </NavLink>
              </li>
              <li>
              <NavLink
                  to="/Exchanges"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? isToggled  ? "text-white" : "text-red-600" : "text-black"
                    } uppercase hover:underline font-bold text-[0.9rem]`
                  }
                >
                  Exchanges
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {mobileMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50">
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col gap-4 items-center text-center bg-white p-10 rounded-lg ">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-red-600" : "text-black"
                    } uppercase hover:underline font-bold text-[0.9rem] bg-white rounded-md`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Coins"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-red-600" : "text-black"
                    } uppercase hover:underline font-bold text-[0.9rem] bg-white rounded-md`
                  }
                >
                  Coins
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Exchanges"
                  onClick={() => setMobileMenu(false)}
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-red-600" : "text-black"
                    } uppercase hover:underline font-bold text-[0.9rem] bg-white rounded-md`
                  }
                >
                  Exchanges
                </NavLink>
              </li>
              <li>
                <select
                  onChange={handleSelectCountry}
                  className="border p-1 rounded"
                >
                  <option value="inr">IND</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                </select>
              </li>
              <li>
                <RxCross2
                  onClick={() => setMobileMenu(false)}
                  className="text-3xl text-red-600  "
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
