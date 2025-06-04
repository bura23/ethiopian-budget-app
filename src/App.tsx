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
    <Box data-oid="3qq_5.p">
      <Navigation data-oid="_7j8eqz" />
      <Box p={4} mt={16} data-oid="gxbqp8_">
        <Routes data-oid="f25f_jt">
          <Route
            path="/"
            element={
              <ProtectedRoute data-oid="4b4dx97">
                <Dashboard data-oid="9kb1-i9" />
              </ProtectedRoute>
            }
            data-oid="8ey5nhw"
          />

          <Route
            path="/login"
            element={<Login data-oid="nbio30w" />}
            data-oid="as9yjq3"
          />

          <Route
            path="/register"
            element={<Register data-oid="2o2ghl1" />}
            data-oid="cjj34n5"
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute data-oid="cd::490">
                <Transactions data-oid="yo1l9u_" />
              </ProtectedRoute>
            }
            data-oid="yjqfyql"
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute data-oid="c.yyr9y">
                <Categories data-oid="8ukdj1:" />
              </ProtectedRoute>
            }
            data-oid=":jpz0.8"
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute data-oid=".zh_rk2">
                <Reports data-oid="t3yqdj0" />
              </ProtectedRoute>
            }
            data-oid="s1jpne1"
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute data-oid="b-toc:q">
                <Settings data-oid="0p1rv5." />
              </ProtectedRoute>
            }
            data-oid="uo6_bof"
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
