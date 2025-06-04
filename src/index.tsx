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
  <React.StrictMode data-oid="mzt-hxu">
    <BrowserRouter data-oid="ybo48mn">
      <ChakraProvider theme={theme} data-oid="i:wxdfi">
        <App data-oid="-_m:jx5" />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
