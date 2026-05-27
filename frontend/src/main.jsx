import React from "react";

import ReactDOM from "react-dom/client";

import {

  BrowserRouter,
  Routes,
  Route,
  Navigate

} from "react-router-dom";

import App from "./App";

import Login from "./pages/Login";
import Signup from "./pages/Signup";


// PROTECTED ROUTE
function ProtectedRoute({

  children

}) {

  const token =
    localStorage.getItem(
      "token"
    );

  return token

    ? children

    : <Navigate to="/login" />;
}


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route

          path="/"

          element={

            <ProtectedRoute>

              <App />

            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);