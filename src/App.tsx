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
    <Box data-oid="aux2yeb">
      <Navigation data-oid="6x0m1aa" />
      <Box p={4} mt={16} data-oid="y2uv4xc">
        <Routes data-oid="xriel40">
          <Route
            path="/"
            element={
              <ProtectedRoute data-oid="o2lb-k6">
                <Dashboard data-oid="5-ujc7p" />
              </ProtectedRoute>
            }
            data-oid="rypjzgi"
          />

          <Route
            path="/login"
            element={<Login data-oid="rpen76p" />}
            data-oid="4h1jja0"
          />

          <Route
            path="/register"
            element={<Register data-oid="1qa2a.g" />}
            data-oid="af.gl6t"
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute data-oid="j3j0dnn">
                <Transactions data-oid="ar0q.v2" />
              </ProtectedRoute>
            }
            data-oid="-xs2q3g"
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute data-oid="3w0rmm.">
                <Categories data-oid="mvl-xv2" />
              </ProtectedRoute>
            }
            data-oid="dv:v405"
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute data-oid="rolfqum">
                <Reports data-oid="ogssfr8" />
              </ProtectedRoute>
            }
            data-oid="2z4chfs"
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute data-oid=".eca12f">
                <Settings data-oid="8lkxeq1" />
              </ProtectedRoute>
            }
            data-oid="b_ul4fy"
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
