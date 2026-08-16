import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

/* =========================
   AUTH
========================= */

import Login from "../pages/auth/Login";

/* =========================
   ADMIN
========================= */

import Dashboard from "../pages/admin/Dashboard";
import Events from "../pages/admin/Events";
import CreateEvent from "../pages/admin/CreateEvent";
import EventDetails from "../pages/admin/EventDetails";
import EventAnalytics from "../pages/admin/EventAnalytics";
import Leads from "../pages/admin/Leads";
import LeadDetails from "../pages/admin/LeadDetails";

/* =========================
   STUDENT
========================= */

import Registration from "../pages/student/Registration";
import RegistrationSuccess from "../pages/student/RegistrationSuccess";
import Application from "../pages/student/Application";


function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            PUBLIC ROUTES
        ================================= */}

        {/* Admin Login */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =================================
            STUDENT ROUTES
        ================================= */}

        {/* 
          Student receives a unique event link:

          /event/:trackingSlug

          Example:

          /event/community-drive-2026
        */}

        <Route
          path="/event/:trackingSlug"
          element={<Registration />}
        />


        {/* Registration successful */}

        <Route
          path="/student/registration-success/:trackingId"
          element={<RegistrationSuccess />}
        />


        {/* Student application */}

        <Route
          path="/student/application/:trackingId"
          element={<Application />}
        />


        {/* =================================
            PROTECTED ADMIN ROUTES
        ================================= */}

        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}

          <Route
            path="/admin/dashboard"
            element={<Dashboard />}
          />


          {/* Events */}

          <Route
            path="/admin/events"
            element={<Events />}
          />


          {/* Create Event */}

          <Route
            path="/admin/events/create"
            element={<CreateEvent />}
          />


          {/* Event Details */}

          <Route
            path="/admin/events/:eventId"
            element={<EventDetails />}
          />


          {/* Event Analytics */}

          <Route
            path="/admin/events/:eventId/analytics"
            element={<EventAnalytics />}
          />


          {/* Leads */}

          <Route
            path="/admin/leads"
            element={<Leads />}
          />


          {/* Lead Details */}

          <Route
            path="/admin/leads/:trackingId"
            element={<LeadDetails />}
          />

        </Route>


        {/* =================================
            DEFAULT ROUTE
        ================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* =================================
            404
        ================================= */}

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "10px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <h1>404</h1>

              <p>
                Page not found.
              </p>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;