import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
//  import theme from "./theme.js";

import "./index.css";
import App from "./App.jsx";

const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Fuerza tema oscuro
    useSystemColorMode: false, // Ignora las preferencias del sistema
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
