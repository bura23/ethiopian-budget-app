import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode data-oid="3:wpip3">
    <BrowserRouter data-oid="htjfeu7">
      <ChakraProvider data-oid="5ien3g-">
        <AuthProvider data-oid="m6dja97">
          <App data-oid="7s6n16-" />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
