import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
// import SignInPage from "./Pages/SigninPage"
import SignUpPage from "./Pages/signupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
