import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/UserAuth/Login";
import Signup from "./Pages/UserAuth/SignUp";
import ForgotPassword from "./Pages/UserAuth/ForgotPassword";
import ResetPassword from "./Pages/UserAuth/ResetPassword";

import Dashboard from "./Pages/DashboardJsx/Dashboard";
import Discussion from "./Pages/DashboardJsx/Discussion";
import MyCourse from "./Pages/DashboardJsx/MyCourse";
import Progress from "./Pages/DashboardJsx/Progress";
import AllCourses from "./Pages/DashboardJsx/AllCourses";
import TopicCourse from "./Pages/DashboardJsx/TopicCourse";
import CourseView from "./Pages/DashboardJsx/CourseView";
import Profile from "./Pages/DashboardJsx/Profile";

import MentorDashboard from "./Pages/MentorMain/MetorDashboard";
import CreateCourse from "./Pages/MentorMain/CreateCourse";
import UpdateCourse from "./Pages/MentorMain/UpdateCourse";
import ManageCourses from "./Pages/MentorMain/ManageCourse";
import MentorChat from "./Pages/Chat/MentorChat";

// Guards
function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function MentorRoute() {
  const email = localStorage.getItem("email");
  return email === "swethasakthi1227@gmail.com" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-course" element={<MyCourse />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/all-courses/:topic" element={<TopicCourse />} />
          <Route path="/course/:id" element={<CourseView />} />
          <Route path="/profile" element={<Profile />} />

          <Route element={<MentorRoute />}>
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/update-course/:id" element={<UpdateCourse />} />
            <Route path="/manage-course" element={<ManageCourses />} />
            <Route path="/mentor-chats" element={<MentorChat />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
