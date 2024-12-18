import {
  ReactNode,
  StrictMode,
  createContext,
  useEffect,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";



const queryClient = new QueryClient();

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") as string;

  const [theme, setTheme] = useState<string>(storedTheme || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
