import React from 'react';
import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";

const Main = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
      </Routes>
    </MsalProvider>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Component /> : <Navigate to="/auth" />;
};

export default Main;
