import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";

function Documents() {
  const navigate = useNavigate();
  const location = useLocation();

  const vendor = location.state?.vendor;

  const [documents, setDocuments] = useState({
    identity: null,
    business: null,
    other: null,
  });

  const handleFileChange = (type, event) => {
    const file = event.target.files[0];

    if (!file) return;

    setDocuments((previous) => ({
      ...previous,
      [type]: file,
    }));
  };

  const removeFile = (type) => {
    setDocuments((previous) => ({
      ...previous,
      [type]: null,
    }));
  };

  const handleContinue = () => {
    navigate("/recommendations", {
      state: {
        vendor,
        documents,
      },
    });
  };

  return (
    <main className="dashboard">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Vendor Application</h1>
          <p>
            Upload the required documents for the vendor application.
          </p>
        </div>
      </div>


      {/* Progress */}
      <div className="form-progress">

        <div className="progress-step completed">
          <div className="step-number">
            <CheckCircle size={16} />
          </div>

          <div>
            <strong>Business Information</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="progress-line completed-line"></div>

        <div className="progress-step active">
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


      {/* Document Panel */}
      <div className="form-panel">

        <div className="form-section-header">
          <div className="section-icon">
            <FileText size={20} />
          </div>

          <div>
            <h2>Required Documents</h2>
            <p>
              Upload documents required for evaluating the vendor application.
            </p>
          </div>
        </div>


        {/* Documents */}
        <div className="document-list">

          {/* Identity */}
          <DocumentUpload
            title="Identity Document"
            description="Upload an identity document of the vendor."
            file={documents.identity}
            onChange={(event) =>
              handleFileChange("identity", event)
            }
            onRemove={() => removeFile("identity")}
          />


          {/* Business */}
          <DocumentUpload
            title="Business / Registration Document"
            description="Upload a document related to the proposed business."
            file={documents.business}
            onChange={(event) =>
              handleFileChange("business", event)
            }
            onRemove={() => removeFile("business")}
          />


          {/* Other */}
          <DocumentUpload
            title="Additional Document"
            description="Upload any other supporting document if required."
            file={documents.other}
            onChange={(event) =>
              handleFileChange("other", event)
            }
            onRemove={() => removeFile("other")}
          />

        </div>


        {/* FYP Processing Notice */}
        <div className="form-notice">
          <FileText size={18} />

          <div>
            <strong>Document processing</strong>

            <p>
              In the complete system, uploaded documents can be processed
              to extract relevant information required for vendor evaluation.
            </p>
          </div>
        </div>


        {/* Footer */}
        <div className="form-footer">

          <button
            className="secondary-button"
            onClick={() =>
              navigate("/new-vendor", {
                state: {
                  vendor,
                },
              })
            }
          >
            <ArrowLeft size={15} />
            Back
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


/* =========================
   DOCUMENT UPLOAD COMPONENT
========================= */

function DocumentUpload({
  title,
  description,
  file,
  onChange,
  onRemove,
}) {
  return (
    <div className="document-upload">

      <div className="document-info">

        <div className="document-icon">
          <FileText size={20} />
        </div>

        <div>
          <strong>{title}</strong>
          <p>{description}</p>
        </div>

      </div>


      {!file ? (
        <label className="upload-button">
          <Upload size={15} />
          Upload

          <input
            type="file"
            hidden
            onChange={onChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </label>
      ) : (
        <div className="uploaded-file">

          <CheckCircle size={15} />

          <span>{file.name}</span>

          <button
            type="button"
            onClick={onRemove}
            className="remove-file"
          >
            <X size={14} />
          </button>

        </div>
      )}

    </div>
  );
}

export default Documents;