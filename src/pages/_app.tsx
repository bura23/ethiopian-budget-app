import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/AuthContext";
import { AppProps } from "next/app";
import { Box } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Box display="flex" flexDirection="column" minH="100vh">
          <Navigation />
          <Box p={4} mt={16} flex="1">
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
} 