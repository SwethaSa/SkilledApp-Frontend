import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/UserAuth/Login";
import Signup from "./Pages/UserAuth/SignUp";
import ForgotPassword from "./Pages/UserAuth/ForgotPassword";
import Dashboard from "./Pages/DashboardJsx/Dashboard";
import Discussion from "./Pages/DashboardJsx/Discussion";
import MyCourse from "./Pages/DashboardJsx/MyCourse";
import Progress from "./Pages/DashboardJsx/Progress";
import AllCourses from "./Pages/DashboardJsx/AllCourses";
import TopicCourse from "./Pages/DashboardJsx/TopicCourse";
import CourseView from "./Pages/DashboardJsx/CourseView";
import Profile from "./Pages/DashboardJsx/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-course" element={<MyCourse />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/discussion" element={<Discussion />} />
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/all-courses/:topic" element={<TopicCourse />} />
                <Route path="/course/:id" element={<CourseView />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;
