import "@/styles/globals.css";

import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";

import { Navbar, Footer } from "@/components";
import theme from "../theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: { xl: "1488px" },
          px: { xs: "10px", sm: "20px" },
        }}
        m="auto"
      >
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
