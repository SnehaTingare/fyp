import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";

function VendorDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const vendor = location.state?.vendor;

  // Fallback dummy vendor so the page doesn't break
  const currentVendor = vendor || {
    id: 1,
    businessName: "ABC Food Stall",
    businessType: "Food Vendor",
    location: "Panchavati, Nashik",
    ownerName: "Amit Patil",
    phone: "9876543210",
    status: "Pending",
  };

  const handleRecommendation = () => {
    navigate("/recommendations", {
      state: {
        vendor: currentVendor,
      },
    });
  };

  return (
    <main className="dashboard">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Vendor Details</h1>
          <p>View vendor application and generate a zone recommendation.</p>
        </div>

        <button
          className="secondary-button"
          onClick={() => navigate("/vendors")}
        >
          <ArrowLeft size={16} />
          Back to Vendors
        </button>
      </div>

      {/* Vendor Header */}
      <section className="vendor-detail-header">
        <div className="vendor-detail-avatar">
          {currentVendor.businessName
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>

        <div>
          <h2>{currentVendor.businessName}</h2>
          <p>{currentVendor.businessType}</p>
        </div>

        <span className={`status ${
          currentVendor.status === "Evaluated"
            ? "evaluated"
            : "pending"
        }`}>
          {currentVendor.status}
        </span>
      </section>

      {/* Information */}
      <section className="vendor-details-grid">

        {/* Personal Information */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3>
                <User size={18} />
                Vendor Information
              </h3>
              <p>Basic applicant information</p>
            </div>
          </div>

          <div className="detail-list">

            <div className="detail-row">
              <span>Owner Name</span>
              <strong>{currentVendor.ownerName}</strong>
            </div>

            <div className="detail-row">
              <span>Business Name</span>
              <strong>{currentVendor.businessName}</strong>
            </div>

            <div className="detail-row">
              <span>Business Type</span>
              <strong>{currentVendor.businessType}</strong>
            </div>

            <div className="detail-row">
              <span>Contact Number</span>
              <strong>{currentVendor.phone}</strong>
            </div>

          </div>
        </div>

        {/* Location */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3>
                <MapPin size={18} />
                Proposed Location
              </h3>
              <p>Location submitted by vendor</p>
            </div>
          </div>

          <div className="location-box">
            <MapPin size={24} />

            <div>
              <strong>{currentVendor.location}</strong>
              <span>Nashik, Maharashtra</span>
            </div>
          </div>
        </div>

      </section>

      {/* Documents */}
      <section className="dashboard-panel vendor-documents">

        <div className="panel-header">
          <div>
            <h3>
              <FileText size={18} />
              Application Documents
            </h3>
            <p>Documents submitted with this application</p>
          </div>
        </div>

        <div className="document-status-list">

          <div className="document-status">
            <FileText size={18} />

            <div>
              <strong>Identity Proof</strong>
              <span>Submitted</span>
            </div>

            <CheckCircle size={18} />
          </div>

          <div className="document-status">
            <FileText size={18} />

            <div>
              <strong>Business Registration</strong>
              <span>Submitted</span>
            </div>

            <CheckCircle size={18} />
          </div>

          <div className="document-status">
            <FileText size={18} />

            <div>
              <strong>Address Proof</strong>
              <span>Submitted</span>
            </div>

            <CheckCircle size={18} />
          </div>

        </div>
      </section>

      {/* Recommendation Action */}
      <section className="recommendation-action">

        <div>
          <div className="action-icon">
            <Sparkles size={22} />
          </div>

          <div>
            <h3>Generate Zone Recommendation</h3>

            <p>
              Analyze this vendor's business type and proposed location
              to find suitable vending zones in Nashik.
            </p>
          </div>
        </div>

        <button
          className="primary-button"
          onClick={handleRecommendation}
        >
          Generate Recommendation
          <Sparkles size={16} />
        </button>

      </section>

    </main>
  );
}

export default VendorDetails;