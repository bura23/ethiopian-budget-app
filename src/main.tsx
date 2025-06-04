import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode data-oid="zf1duxw">
    <BrowserRouter data-oid="upidrys">
      <ChakraProvider data-oid="7u4zpyr">
        <AuthProvider data-oid="imbyn9z">
          <App data-oid=".q0yw2o" />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
