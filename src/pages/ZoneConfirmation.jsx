import { CheckCircle, MapPin, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function ZoneConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const vendor = location.state?.vendor;
  const selectedZone = location.state?.selectedZone;

  if (!selectedZone) {
    return (
      <main className="dashboard">
        <h1>No location selected</h1>

        <button
          className="primary-button"
          onClick={() => navigate("/recommendations")}
        >
          Back to Recommendations
        </button>
      </main>
    );
  }

  return (
    <main className="dashboard">

      <div className="page-header">
        <div>
          <h1>Location Selected</h1>
          <p>
            Your recommended Nashik vending location has been selected.
          </p>
        </div>
      </div>

      <div className="confirmation-card">

        <div className="confirmation-icon">
          <CheckCircle size={42} />
        </div>

        <h2>Location Successfully Selected</h2>

        <p className="confirmation-text">
          The recommended vending location has been selected for this
          vendor application.
        </p>

        <div className="confirmation-details">

          {vendor && (
            <>
              <div>
                <span>BUSINESS</span>
                <strong>{vendor.businessName}</strong>
              </div>

              <div>
                <span>BUSINESS TYPE</span>
                <strong>{vendor.businessType}</strong>
              </div>

              <div>
                <span>PROPOSED LOCATION</span>
                <strong>{vendor.location}</strong>
              </div>
            </>
          )}

          <div>
            <span>RECOMMENDED LOCATION</span>

            <strong className="selected-location">
              <MapPin size={17} />
              {selectedZone.name}
            </strong>
          </div>

          <div>
            <span>SUITABILITY SCORE</span>
            <strong>{selectedZone.score}%</strong>
          </div>

        </div>

        <div className="confirmation-actions">

          <button
            className="secondary-button"
            onClick={() => navigate("/recommendations", {
              state: { vendor }
            })}
          >
            <ArrowLeft size={16} />
            Change Location
          </button>

          <button
            className="primary-button"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

        </div>

      </div>

    </main>
  );
}

export default ZoneConfirmation;