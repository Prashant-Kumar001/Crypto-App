import { useContext, createContext, useState, useEffect } from "react";
const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isToggled, setMode] = useState(false);
  const setIsToggled = () => {
    setMode(!isToggled);
  };
  useEffect(() => {
    if (isToggled) {
      document.body.classList.add("NightMode");
      document.body.classList.remove("DayMode");
    } else {
      document.body.classList.remove("NightMode");
      document.body.classList.add("DayMode");
    }
  }, [isToggled]);
  return (
    <ToggleContext.Provider value={{ isToggled, setIsToggled }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => useContext(ToggleContext);
