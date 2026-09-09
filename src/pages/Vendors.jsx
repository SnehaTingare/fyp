import { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  Eye,
  Users,
} from "lucide-react";

function Vendors() {
  const [search, setSearch] = useState("");

  // Dummy Nashik vendor data for frontend prototype
  const vendors = [
    {
      id: "NV-001",
      name: "Shree Ganesh Food Stall",
      type: "Food Vendor",
      location: "Panchavati",
      zone: "Zone N-01",
      status: "Active",
    },
    {
      id: "NV-002",
      name: "Nashik Fresh Juice",
      type: "Food & Beverage",
      location: "Nashik Road",
      zone: "Zone N-03",
      status: "Active",
    },
    {
      id: "NV-003",
      name: "Sai General Store",
      type: "Retail",
      location: "Nashik East",
      zone: "Zone N-05",
      status: "Pending",
    },
    {
      id: "NV-004",
      name: "Mahalaxmi Snacks",
      type: "Food Vendor",
      location: "Nashik West",
      zone: "Zone N-07",
      status: "Active",
    },
    {
      id: "NV-005",
      name: "Ganesh Tea Center",
      type: "Food & Beverage",
      location: "Panchavati",
      zone: "Zone N-02",
      status: "Under Review",
    },
    {
      id: "NV-006",
      name: "Shivam Garments",
      type: "Retail",
      location: "Nashik Road",
      zone: "Zone N-04",
      status: "Active",
    },
    {
      id: "NV-007",
      name: "Matoshree Vegetable Stall",
      type: "Vegetable Vendor",
      location: "Nashik East",
      zone: "Zone N-06",
      status: "Active",
    },
    {
      id: "NV-008",
      name: "Sai Mobile Accessories",
      type: "Retail",
      location: "Nashik West",
      zone: "Zone N-08",
      status: "Pending",
    },
  ];

  // Search vendors
  const filteredVendors = vendors.filter((vendor) =>
    `${vendor.name} ${vendor.type} ${vendor.location} ${vendor.zone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="dashboard">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="page-header">

        <div>
          <h1>Vendors</h1>

          <p>
            Registered street vendors in Nashik and their current
            zoning information.
          </p>
        </div>

        <button className="primary-button">
          + New Application
        </button>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <section className="stats-grid">

        {/* Total Vendors */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon">
              <Users size={20} />
            </div>

            <span className="stat-label">
              TOTAL VENDORS
            </span>

          </div>

          <h2>7,259</h2>

          <p>
            Vendor records in Nashik dataset
          </p>

        </div>


        {/* Zoned Vendors */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon">
              <MapPin size={20} />
            </div>

            <span className="stat-label">
              ZONED
            </span>

          </div>

          <h2>5,310</h2>

          <p>
            Vendors matched to zones
          </p>

        </div>


        {/* Review */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon">
              <Filter size={20} />
            </div>

            <span className="stat-label">
              REVIEW
            </span>

          </div>

          <h2>1,949</h2>

          <p>
            Records requiring review
          </p>

        </div>


        {/* Business Types */}

        <div className="stat-card">

          <div className="stat-top">

            <div className="stat-icon">
              <Users size={20} />
            </div>

            <span className="stat-label">
              BUSINESS TYPES
            </span>

          </div>

          <h2>18</h2>

          <p>
            Business categories identified
          </p>

        </div>

      </section>


      {/* =====================================================
          VENDOR RECORDS
      ===================================================== */}

      <section className="dashboard-panel vendor-page-panel">

        {/* Panel Header */}

        <div className="panel-header">

          <div>

            <h3>
              Vendor Records
            </h3>

            <p>
              Browse vendor information and current zoning
              assignments.
            </p>

          </div>

        </div>


        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <div className="vendor-toolbar">

          <div className="search-box">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search vendor, location or zone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>


          <button className="secondary-button">

            <Filter size={16} />

            Filters

          </button>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="vendor-table-wrapper">

          <table className="vendor-table">

            <thead>

              <tr>

                <th>
                  Vendor
                </th>

                <th>
                  Business Type
                </th>

                <th>
                  Location
                </th>

                <th>
                  Zone
                </th>

                <th>
                  Status
                </th>

                <th>
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredVendors.length > 0 ? (

                filteredVendors.map((vendor) => (

                  <tr key={vendor.id}>

                    {/* Vendor */}

                    <td>

                      <div className="table-vendor">

                        <div className="vendor-avatar">

                          {vendor.name
                            .split(" ")
                            .slice(0, 2)
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()}

                        </div>


                        <div>

                          <strong>
                            {vendor.name}
                          </strong>

                          <span>
                            {vendor.id}
                          </span>

                        </div>

                      </div>

                    </td>


                    {/* Business Type */}

                    <td>
                      {vendor.type}
                    </td>


                    {/* Location */}

                    <td>

                      <div className="location-cell">

                        <MapPin size={14} />

                        {vendor.location}

                      </div>

                    </td>


                    {/* Zone */}

                    <td>

                      <span className="zone-tag">

                        {vendor.zone}

                      </span>

                    </td>


                    {/* Status */}

                    <td>

                      <span
                        className={`status ${
                          vendor.status === "Active"
                            ? "evaluated"
                            : "pending"
                        }`}
                      >

                        {vendor.status}

                      </span>

                    </td>


                    {/* View */}

                    <td>

                      <button
                        className="icon-button"
                        title="View vendor"
                      >

                        <Eye size={17} />

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#6b7280",
                    }}
                  >

                    No vendors found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =================================================
            TABLE FOOTER
        ================================================= */}

        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #edf0f3",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#8a94a6",
            fontSize: "13px",
          }}
        >

          <span>
            Showing {filteredVendors.length} of 7,259 vendor records
          </span>

          <span>
            Nashik Vendor Dataset
          </span>

        </div>

      </section>

    </main>
  );
}

export default Vendors;