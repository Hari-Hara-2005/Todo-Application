import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInForm from "./SignIn";
import SignupForm from "./SignUp";
import Home from "./Home";
import ProtectedRoute from "./ProductRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/" element={<SignInForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
