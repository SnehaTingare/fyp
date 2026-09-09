import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import NewVendor from "./pages/NewVendor";
import VendorDetails from "./pages/VendorDetails";
import Documents from "./pages/Documents";
import ZoneRecommendation from "./pages/ZoneRecommendation";
import Zones from "./pages/Zones";
import Vendors from "./pages/Vendors";

import "./App.css";


function App() {
  return (
    <BrowserRouter>

      <div className="app">

        {/* Main Sidebar */}
        <Sidebar />


        {/* Main Content */}
        <div className="main-area">

          <Routes>

            {/* Default */}
            <Route
              path="/"
              element={
                <Navigate to="/dashboard" replace />
              }
            />


            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />


            {/* Vendors */}
            <Route
              path="/vendors"
              element={<Vendors />}
            />

            <Route
              path="/vendors/:id"
              element={<VendorDetails />}
            />


            {/* =========================================
                NEW APPLICATION FLOW

                Business Information
                       ↓
                Documents
                       ↓
                Recommendation
                       ↓
                Confirmation
            ========================================= */}


            {/* Step 1 */}
            <Route
              path="/new-vendor"
              element={<NewVendor />}
            />


            {/* Step 2 */}
            <Route
              path="/documents"
              element={<Documents />}
            />


            {/* Step 3 */}
            <Route
              path="/recommendations"
              element={<ZoneRecommendation />}
            />


            {/* Zones */}
            <Route
              path="/zones"
              element={<Zones />}
            />


            {/* Unknown URL */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;