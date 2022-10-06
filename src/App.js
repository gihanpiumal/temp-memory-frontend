import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./app.scss";

import {
  Login,
  Home,
  Registration,
  EmailVerification,
  ResetPassword,
  ResetPasswordVerification,
} from "./pages";
import { RoutesConstant } from "./assets/constants";

const App = () => {
  return (
    <div className="app">
      <div className="app-wrapper">
        <Routes>
          <Route path="*" element={<Navigate to={RoutesConstant.home} />} />
          <Route path={RoutesConstant.home} element={<Home />} />
          <Route path={RoutesConstant.login} element={<Login />} />
          <Route
            path={RoutesConstant.registration}
            element={<Registration />}
          />
          <Route
            path={RoutesConstant.emailVerification}
            element={<EmailVerification />}
          />
          <Route
            path={RoutesConstant.resetPassword}
            element={<ResetPassword />}
          />
          <Route
            path={RoutesConstant.resetPasswordVerification}
            element={<ResetPasswordVerification />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
