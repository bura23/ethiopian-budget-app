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
  <React.StrictMode data-oid="827wrtk">
    <BrowserRouter data-oid="b0ay4te">
      <ChakraProvider theme={theme} data-oid="gp2tckt">
        <App data-oid="ptixp1x" />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
