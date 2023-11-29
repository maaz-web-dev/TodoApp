import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
// import SignInPage from "./Pages/SigninPage"
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/signupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
