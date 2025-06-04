import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode data-oid="8:kt8rc">
    <BrowserRouter data-oid="05af-oo">
      <ChakraProvider data-oid="f:30wdz">
        <AuthProvider data-oid="qcy:-e_">
          <App data-oid="vbmjirh" />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
