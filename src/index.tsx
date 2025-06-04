import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode data-oid="1vzcl13">
    <BrowserRouter data-oid="9h4p.j8">
      <ChakraProvider theme={theme} data-oid="z53v2iq">
        <App data-oid="bcukfeq" />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
