import {
  LayoutDashboard,
  Users,
  Map,
  PlusCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* =========================
          BRAND
      ========================= */}

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          V
        </div>

        <div className="sidebar-brand-text">
          <h2>VendorHub</h2>
          <p>Nashik</p>
        </div>

      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>


        <NavLink
          to="/vendors"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Users size={20} />
          <span>Vendors</span>
        </NavLink>


        <NavLink
          to="/zones"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Map size={20} />
          <span>Zones</span>
        </NavLink>


        {/* New Application */}

        <NavLink
          to="/new-vendor"
          className={({ isActive }) =>
            `nav-item new-application ${
              isActive ? "active" : ""
            }`
          }
        >
          <PlusCircle size={20} />
          <span>New Application</span>
        </NavLink>

      </nav>


      {/* =========================
          SIDEBAR FOOTER
      ========================= */}

      <div className="sidebar-footer">

        <strong>
          Vendor Management
        </strong>

        <span>
          Nashik Municipal Area
        </span>

      </div>

    </aside>
  );
}

export default Sidebar;