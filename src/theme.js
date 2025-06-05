// theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark", // ✅ Establece el modo oscuro por defecto
  useSystemColorMode: false, // ❌ No usar el modo del sistema
};

const theme = extendTheme({ config });

export default theme;
