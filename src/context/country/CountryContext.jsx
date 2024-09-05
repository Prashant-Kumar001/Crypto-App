import { useContext, createContext, useState, useEffect } from "react";

// Create a context
const CountryContext = createContext();

// Provider component
export const CountryProvider = ({ children }) => {
    const [country, setCountry] = useState('inr'); // Use null or an initial value

    const selectCountry = (value) => {
        setCountry(value);
    };

    return (
        <CountryContext.Provider value={{ country, selectCountry }}>
            {children}
        </CountryContext.Provider>
    );
};

// Custom hook to use the CountryContext
export const useCountry = () => useContext(CountryContext);
