import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Box data-oid="6z:qd3m">
      <Navigation data-oid="8w49mh4" />
      <Box p={4} mt={16} data-oid="n1m-7m7">
        <Routes data-oid="kiro:9f">
          <Route
            path="/"
            element={
              <ProtectedRoute data-oid="hb..8tf">
                <Dashboard data-oid="8pbhdsh" />
              </ProtectedRoute>
            }
            data-oid="-987vtl"
          />

          <Route
            path="/login"
            element={<Login data-oid="fw8w-om" />}
            data-oid="ki_33qv"
          />
          <Route
            path="/register"
            element={<Register data-oid="qx_ihjr" />}
            data-oid="t:2yw03"
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute data-oid="_cjqcim">
                <Transactions data-oid="t20_:3c" />
              </ProtectedRoute>
            }
            data-oid="iobhy8x"
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute data-oid="4pb4fvk">
                <Categories data-oid="04de98l" />
              </ProtectedRoute>
            }
            data-oid="hruc6iw"
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute data-oid="t5sium3">
                <Reports data-oid="8x2qr6x" />
              </ProtectedRoute>
            }
            data-oid="9e_-47d"
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute data-oid="9jnl980">
                <Settings data-oid="ghrqrf3" />
              </ProtectedRoute>
            }
            data-oid="7f1i.s7"
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
