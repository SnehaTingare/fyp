import { useState, useMemo } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  MapPin,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Users,
  Navigation,
} from "lucide-react";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import {
  getRecommendations,
  getVendorCoordinates,
} from "../data/recommendations";


// ======================================================
// NASHIK ZONE POLYGONS
// ======================================================

const zoneShapes = {

  1: [
    [20.0170, 73.7830],
    [20.0205, 73.7920],
    [20.0145, 73.8000],
    [20.0065, 73.7960],
    [20.0075, 73.7870],
  ],

  2: [
    [20.0060, 73.7440],
    [20.0090, 73.7540],
    [20.0030, 73.7620],
    [19.9950, 73.7570],
    [19.9970, 73.7470],
  ],

  3: [
    [20.0140, 73.8200],
    [20.0180, 73.8300],
    [20.0100, 73.8380],
    [20.0010, 73.8340],
    [20.0030, 73.8230],
  ],

  4: [
    [19.9620, 73.8270],
    [19.9670, 73.8380],
    [19.9580, 73.8460],
    [19.9500, 73.8390],
    [19.9530, 73.8290],
  ],

  5: [
    [19.9780, 73.7980],
    [19.9820, 73.8080],
    [19.9750, 73.8160],
    [19.9660, 73.8110],
    [19.9690, 73.8010],
  ],

  6: [
    [20.0430, 73.7700],
    [20.0480, 73.7790],
    [20.0410, 73.7870],
    [20.0320, 73.7820],
    [20.0350, 73.7720],
  ],

  7: [
    [20.0060, 73.7200],
    [20.0100, 73.7300],
    [20.0030, 73.7380],
    [19.9940, 73.7330],
    [19.9970, 73.7230],
  ],

  8: [
    [19.9670, 73.7880],
    [19.9710, 73.7980],
    [19.9640, 73.8050],
    [19.9550, 73.8000],
    [19.9580, 73.7900],
  ],
};


// ======================================================
// MAP UPDATE COMPONENT
// ======================================================

function MapUpdater({ zone }) {

  const map = useMap();

  if (zone?.coordinates) {

    map.flyTo(
      zone.coordinates,
      13,
      {
        duration: 0.8,
      }
    );

  }

  return null;
}


// ======================================================
// MAIN COMPONENT
// ======================================================

function ZoneRecommendation() {

  const navigate = useNavigate();

  const location = useLocation();

  const vendor =
    location.state?.vendor;


  // ====================================================
  // GENERATE RECOMMENDATIONS
  // ====================================================

  const recommendations = useMemo(
    () => getRecommendations(vendor),
    [vendor]
  );


  // ====================================================
  // SELECTED ZONE
  // ====================================================

  const [selectedZone, setSelectedZone] =
    useState(null);


  const activeZone =
    selectedZone ||
    recommendations[0];


  // ====================================================
  // BACK
  // ====================================================

  const handleBack = () => {

    navigate(
      "/documents",
      {
        state: {
          vendor,
        },
      }
    );

  };


  // ====================================================
  // CONTINUE
  // ====================================================

  const handleContinue = () => {

    if (!activeZone) {
      return;
    }

    navigate(
      "/zone-confirmation",
      {
        state: {
          vendor,
          selectedZone: activeZone,
        },
      }
    );

  };


  // ====================================================
  // EMPTY STATE
  // ====================================================

  if (!activeZone) {

    return (

      <main className="dashboard">

        <div className="page-header">

          <div>

            <h1>
              Zone Recommendation
            </h1>

            <p>
              No recommendation could be generated.
            </p>

          </div>

        </div>

      </main>

    );

  }


  // ====================================================
  // PAGE
  // ====================================================

  return (

    <main className="dashboard">


      {/* ================================================
          HEADER
      ================================================= */}

      <div className="page-header">

        <div>

          <h1>
            Zone Recommendation
          </h1>

          <p>
            Recommended vending locations based on
            the submitted application.
          </p>

        </div>

      </div>


      {/* ================================================
          PROGRESS
      ================================================= */}

      <div className="form-progress">


        <div className="progress-step completed">

          <div className="step-number">

            <CheckCircle size={16} />

          </div>

          <div>

            <strong>
              Business Information
            </strong>

            <span>
              Completed
            </span>

          </div>

        </div>


        <div className="progress-line completed-line" />


        <div className="progress-step completed">

          <div className="step-number">

            <CheckCircle size={16} />

          </div>

          <div>

            <strong>
              Documents
            </strong>

            <span>
              Completed
            </span>

          </div>

        </div>


        <div className="progress-line completed-line" />


        <div className="progress-step active">

          <div className="step-number">
            3
          </div>

          <div>

            <strong>
              Recommendation
            </strong>

            <span>
              View suitable locations
            </span>

          </div>

        </div>

      </div>


      {/* ================================================
          VENDOR SUMMARY
      ================================================= */}

      {vendor && (

        <div className="vendor-summary">

          <div>

            <span>
              APPLICATION
            </span>

            <strong>
              {vendor.businessName}
            </strong>

          </div>


          <div>

            <span>
              BUSINESS TYPE
            </span>

            <strong>
              {vendor.businessType}
            </strong>

          </div>


          <div>

            <span>
              PROPOSED LOCATION
            </span>

            <strong>
              {vendor.location}
            </strong>

          </div>

        </div>

      )}


      {/* ================================================
          RECOMMENDATION LAYOUT
      ================================================= */}

      <section className="recommendation-layout">


        {/* ==============================================
            LEFT SIDE
        =============================================== */}

        <div className="recommendation-main">


          <div className="recommendation-header">

            <div>

              <h2>
                Top Recommended Locations
              </h2>

              <p>
                Select one of the recommended Nashik
                vending locations to view its details.
              </p>

            </div>


            <div className="recommendation-badge">

              <Star size={14} />

              Top 3 Matches

            </div>

          </div>


          {/* ============================================
              RECOMMENDATION CARDS
          ============================================ */}

          <div className="recommendation-cards">

            {recommendations.map((zone) => (

              <button
                key={zone.id}
                type="button"
                className={`recommendation-card ${
                  activeZone.id === zone.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedZone(zone)
                }
              >


                <div className="recommendation-card-top">

                  <div className="rank">
                    #{zone.rank}
                  </div>

                  <div className="score">
                    {zone.score}%
                  </div>

                </div>


                <div className="recommendation-zone-name">

                  <MapPin size={17} />

                  <strong>
                    {zone.name}
                  </strong>

                </div>


                <div className="recommendation-meta">

                  <span>

                    <Navigation size={12} />

                    {zone.distance}

                  </span>


                  <span>

                    <Users size={12} />

                    {zone.capacityText}

                  </span>

                </div>


                <div className="score-bar">

                  <div
                    className="score-fill"
                    style={{
                      width:
                        `${zone.score}%`,
                    }}
                  />

                </div>


                <div className="suitability">

                  {zone.suitability}

                </div>

              </button>

            ))}

          </div>


          {/* ============================================
              SELECTED ZONE
          ============================================ */}

          <div className="selected-zone-panel">


            <div className="selected-zone-header">


              <div className="selected-zone-icon">

                <MapPin size={20} />

              </div>


              <div>

                <span>
                  SELECTED LOCATION
                </span>

                <h2>
                  {activeZone.name}
                </h2>

              </div>


              <div className="selected-score">

                <strong>
                  {activeZone.score}%
                </strong>

                <span>
                  Suitability
                </span>

              </div>

            </div>


            <div className="why-zone">

              <h3>
                Why is this location recommended?
              </h3>


              <div className="reason-list">

                {activeZone.reasons.map(
                  (reason, index) => (

                    <div
                      className="reason"
                      key={index}
                    >

                      <CheckCircle size={16} />

                      <span>
                        {reason}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>


        {/* ==============================================
            MAP
        =============================================== */}

        <div className="recommendation-map">


          <div className="map-header">

            <div>

              <h3>
                Nashik Location Map
              </h3>

              <p>
                Recommended vending locations
              </p>

            </div>

          </div>


          {/* ============================================
              REAL LEAFLET MAP
          ============================================ */}

          <div
            className="leaflet-recommendation-map"
            style={{
              height: "520px",
              width: "100%",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >

            <MapContainer
              center={[
                20.0059,
                73.7897,
              ]}
              zoom={12}
              scrollWheelZoom={true}
              style={{
                height: "100%",
                width: "100%",
              }}
            >


              {/* OpenStreetMap */}

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              {/* Move map when selected zone changes */}

              <MapUpdater
                zone={activeZone}
              />


              {/* ========================================
                  ZONE POLYGONS
              ========================================= */}

              {recommendations.map(
                (zone) => {

                  const polygon =
                    zoneShapes[zone.id];

                  if (!polygon) {
                    return null;
                  }


                  const isSelected =
                    activeZone.id === zone.id;


                  return (

                    <Polygon
                      key={`polygon-${zone.id}`}
                      positions={polygon}
                      pathOptions={{
                        color:
                          isSelected
                            ? "#2563eb"
                            : "#64748b",

                        fillColor:
                          isSelected
                            ? "#3b82f6"
                            : "#94a3b8",

                        fillOpacity:
                          isSelected
                            ? 0.35
                            : 0.15,

                        weight:
                          isSelected
                            ? 3
                            : 1.5,
                      }}
                    >

                      <Popup>

                        <div
                          style={{
                            minWidth:
                              "180px",
                          }}
                        >

                          <strong>
                            {zone.name}
                          </strong>

                          <br />

                          <span>
                            Rank #{zone.rank}
                          </span>

                          <br />

                          <span>
                            Suitability:
                            {" "}
                            {zone.score}%
                          </span>

                          <br />

                          <span>
                            {zone.capacityText}
                          </span>

                        </div>

                      </Popup>

                    </Polygon>

                  );

                }
              )}


              {/* ========================================
                  ZONE CENTER MARKERS
              ========================================= */}

              {recommendations.map(
                (zone) => (

                  <CircleMarker
                    key={`marker-${zone.id}`}
                    center={
                      zone.coordinates
                    }
                    radius={
                      activeZone.id === zone.id
                        ? 9
                        : 6
                    }
                    pathOptions={{
                      color: "#ffffff",
                      weight: 2,
                      fillColor:
                        activeZone.id ===
                        zone.id
                          ? "#2563eb"
                          : "#64748b",
                      fillOpacity: 1,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedZone(
                          zone
                        ),
                    }}
                  >

                    <Popup>

                      <strong>

                        #{zone.rank}{" "}
                        {zone.name}

                      </strong>

                      <br />

                      Suitability:
                      {" "}
                      {zone.score}%

                    </Popup>

                  </CircleMarker>

                )
              )}


              {/* ========================================
                  PROPOSED VENDOR LOCATION
              ========================================= */}

              {vendor?.location && (

                <Marker
                  position={getVendorCoordinates(
                    vendor.location
                  )}
                >

                  <Popup>

                    <strong>
                      Proposed Location
                    </strong>

                    <br />

                    {vendor.location}

                  </Popup>

                </Marker>

              )}

            </MapContainer>

          </div>


          {/* ============================================
              LEGEND
          ============================================ */}

          <div className="map-legend">

            <div>

              <span
                className="legend-dot recommended"
              />

              Recommended zones

            </div>


            <div>

              <span
                className="legend-dot proposed"
              />

              Proposed location

            </div>

          </div>

        </div>

      </section>


      {/* ================================================
          FOOTER
      ================================================= */}

      <div className="form-footer">


        <button
          className="secondary-button"
          onClick={handleBack}
        >

          <ArrowLeft size={15} />

          Back

        </button>


        <button
          className="primary-button"
          onClick={handleContinue}
        >

          Select This Location

          <ArrowRight size={16} />

        </button>

      </div>

    </main>
  );
}


export default ZoneRecommendation;