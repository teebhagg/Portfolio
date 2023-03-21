import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Main from "./pages/main";
import AOS from 'aos'
import 'aos/dist/aos.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init()
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: "Outfit, sans-serif",
    },
  });
  
  if (isLoading) {
    return (
      <div className="init-loader">
        <div className="custom-loader"></div>
      </div>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
