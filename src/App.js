import React from "react";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";

import HomePage from "./Pages/HomePage";
// import SignInPage from "./Pages/SigninPage"
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/signupPage";
import { useAuth } from "./Utils/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Router>
      <Routes>
      <Route
      path="/"
       element={isLoggedIn ? <HomePage /> : <Navigate to="/Signin" />}
      />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
