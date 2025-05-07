import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/SignUp";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Discussion from "./Pages/Dashboard/Discussion";
import MyCourse from "./Pages/Dashboard/MyCourse";
import Progress from "./Pages/Dashboard/Progress";
import AllCourses from "./Pages/Dashboard/AllCourses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/my-course" element={<MyCourse />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/all-courses" element={<AllCourses />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  console.log("Inside ProtectedRoute - token:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("Redirecting to login...");
    return <Navigate replace to="/login" />;
  }

  return <section>{children}</section>;
}

export default App;
