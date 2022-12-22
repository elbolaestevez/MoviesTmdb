// import themes from "../utils/themes";
import { useState, createContext } from "react";

const initialState = {
  mode: "light",
  // theme: themes.light,
  toggleTheme: () => null,
};

export const ThemeContext = createContext(initialState);

const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const toggleTheme = () => setIsLightTheme(!isLightTheme);

  const value = {
    toggleTheme,
    mode: isLightTheme ? "light" : "dark",
    // theme: isLightTheme ? themes.light : themes.dark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
