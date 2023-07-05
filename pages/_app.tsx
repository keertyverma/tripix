import "@/styles/globals.css";

import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";

import { Navbar } from "@/components";
import theme from "../theme";
import AuthProvider from "@/providers/auth";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>Tripix - Share Travel Memories</title>
          </Head>
          <Box m="auto">
            <Navbar />
            <Box width="100%">
              <Component {...pageProps} />
            </Box>
          </Box>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
