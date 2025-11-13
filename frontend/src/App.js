import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import "./styles/app.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
