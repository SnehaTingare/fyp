import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  FileText,
  ArrowRight,
} from "lucide-react";

function NewVendor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    businessActivity: "",
    location: "",
    ward: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    if (
      !formData.businessName ||
      !formData.businessType ||
      !formData.businessActivity ||
      !formData.location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    navigate("/documents", {
      state: {
        vendor: formData,
      },
    });
  };

  return (
    <main className="dashboard">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>New Vendor Application</h1>
          <p>
            Enter business information to begin the zone recommendation process.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="form-progress">

        <div className="progress-step active">
          <div className="step-number">1</div>
          <div>
            <strong>Business Information</strong>
            <span>Basic vendor details</span>
          </div>
        </div>

        <div className="progress-line"></div>

        <div className="progress-step">
          <div className="step-number">2</div>
          <div>
            <strong>Documents</strong>
            <span>Requirements & documents</span>
          </div>
        </div>

        <div className="progress-line"></div>

        <div className="progress-step">
          <div className="step-number">3</div>
          <div>
            <strong>Recommendation</strong>
            <span>View suitable zones</span>
          </div>
        </div>

      </div>

      {/* Form */}
      <div className="form-panel">

        <div className="form-section-header">
          <div className="section-icon">
            <Building2 size={20} />
          </div>

          <div>
            <h2>Business Information</h2>
            <p>
              Provide details about the vendor and proposed business activity.
            </p>
          </div>
        </div>

        <div className="form-grid">

          {/* Business Name */}
          <div className="form-group">
            <label>
              Business Name <span>*</span>
            </label>

            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter business name"
            />
          </div>

          {/* Business Type */}
          <div className="form-group">
            <label>
              Business Type <span>*</span>
            </label>

            <div className="input-with-icon">
              <BriefcaseBusiness size={17} />

              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select business type
                </option>

                <option value="food">Food Vendor</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Business Activity */}
          <div className="form-group full-width">
            <label>
              Business Activity <span>*</span>
            </label>

            <textarea
              name="businessActivity"
              value={formData.businessActivity}
              onChange={handleChange}
              placeholder="Describe the proposed business activity..."
              rows="4"
            />

            <small>
              Describe what the vendor will sell or what service will be provided.
            </small>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>
              Proposed Location <span>*</span>
            </label>

            <div className="input-with-icon">
              <MapPin size={17} />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter locality / area"
              />
            </div>
          </div>

          {/* Ward */}
          <div className="form-group">
            <label>Ward / Administrative Area</label>

            <input
              type="text"
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              placeholder="Enter ward or administrative area"
            />
          </div>

          {/* Additional Information */}
          <div className="form-group full-width">
            <label>Additional Information</label>

            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Enter any additional information relevant to the application..."
              rows="3"
            />
          </div>

        </div>

        {/* Notice */}
        <div className="form-notice">
          <FileText size={18} />

          <div>
            <strong>What happens next?</strong>

            <p>
              After submitting this information, you will be asked to provide
              the required documents before suitable zones are recommended.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="form-footer">

          <button
            className="secondary-button"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>

          <button
            className="primary-button"
            onClick={handleContinue}
          >
            Continue
            <ArrowRight size={16} />
          </button>

        </div>

      </div>

    </main>
  );
}

export default NewVendor;