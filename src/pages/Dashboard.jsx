import {
  Users,
  CheckCircle,
  Map,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <main className="dashboard">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Overview of Nashik street vendors and zone recommendations
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/new-vendor")}
        >
          <span>+</span>
          New Application
        </button>
      </div>


      {/* Statistics */}
      <section className="stats-grid">

        {/* Vendors */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <Users size={20} />
            </div>

            <span className="stat-label">VENDORS</span>
          </div>

          <h2>7,259</h2>

          <p>Total vendor records</p>
        </div>


        {/* Applications */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <CheckCircle size={20} />
            </div>

            <span className="stat-label">APPLICATIONS</span>
          </div>

          <h2>52</h2>

          <p>Applications evaluated</p>
        </div>


        {/* Zones */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <Map size={20} />
            </div>

            <span className="stat-label">ZONES</span>
          </div>

          <h2>12</h2>

          <p>Designated vending zones</p>
        </div>


        {/* Recommendations */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">
              <ClipboardCheck size={20} />
            </div>

            <span className="stat-label">RECOMMENDATIONS</span>
          </div>

          <h2>40</h2>

          <p>Recommendations generated</p>
        </div>

      </section>


      {/* Lower Dashboard */}
      <section className="dashboard-grid">

        {/* Vendor Data */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h3>Vendor Data</h3>
              <p>Nashik street vendor dataset</p>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/vendors")}
            >
              View All
              <ArrowUpRight size={16} />
            </button>
          </div>


          <div className="application-list">

            <div className="application">
              <div className="application-info">
                <div className="vendor-avatar">NE</div>

                <div>
                  <strong>Nashik East</strong>
                  <span>Vendor records</span>
                </div>
              </div>

              <span className="status evaluated">
                Available
              </span>
            </div>


            <div className="application">
              <div className="application-info">
                <div className="vendor-avatar">NW</div>

                <div>
                  <strong>Nashik West</strong>
                  <span>Vendor records</span>
                </div>
              </div>

              <span className="status evaluated">
                Available
              </span>
            </div>


            <div className="application">
              <div className="application-info">
                <div className="vendor-avatar">PA</div>

                <div>
                  <strong>Panchavati</strong>
                  <span>Vendor records</span>
                </div>
              </div>

              <span className="status evaluated">
                Available
              </span>
            </div>


            <div className="application">
              <div className="application-info">
                <div className="vendor-avatar">NR</div>

                <div>
                  <strong>Nashik Road</strong>
                  <span>Vendor records</span>
                </div>
              </div>

              <span className="status evaluated">
                Available
              </span>
            </div>

          </div>

        </div>


        {/* Nashik Overview */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h3>Nashik Overview</h3>
              <p>Vendor distribution information</p>
            </div>
          </div>


          <div className="zone-summary">

            <div className="zone-number">
              <strong>7,259</strong>
              <span>Vendor Records</span>
            </div>


            <div className="zone-progress">

              <div className="progress-label">
                <span>Dataset</span>
                <strong>Nashik</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "100%" }}
                ></div>
              </div>

              <p>
                Vendor records include business type, location,
                division and related information.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;